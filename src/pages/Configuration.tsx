import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-tomorrow.css";

const API_BASE = "http://localhost:8000";

interface Config {
  roll_ff: number;
  roll_pid_constants: number[][];
  pitch_ff: number;
  pitch_pid_constants: number[][];
  throttle_ff: number;
  throttle_pid_constants: number[][];
  yaw_ff: number;
  yaw_pid_constants: number[][];
  code: string;
}

export default function ConfigurationPage(): JSX.Element {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    axios.get(`${API_BASE}/config`).then((res) => {
      setConfig(res.data);
    });
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [config?.code]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
    i?: number,
    j?: number
  ) => {
    if (!config) return;
    setConfig((prev) => {
      if (!prev) return prev;
      const updated = { ...prev };
      if (typeof i === "number" && typeof j === "number") {
        updated[key][i][j] = parseFloat(e.target.value);
      } else if (key !== "code") {
        updated[key] = parseFloat(e.target.value);
      } else {
        updated[key] = e.target.value;
      }
      return updated;
    });
  };

  const handleSubmit = () => {
    if (!config) return;
    console.log(config);
    axios.put(`${API_BASE}/config`, config).then(() => {
      alert("Configuration saved!");
    });
  };

  const renderPID = (
    label: string,
    key: string,
    ff_value: number,
    values: number[][]
  ) => (
    <div className="bg-gray-800 rounded-lg p-4 mb-6 shadow-md">
      <h3 className="text-yellow-400 text-lg mb-2 font-mono">{label}</h3>
      <div className="mb-2">
        <p className="text-sm text-yellow-300 mb-1">Feedforward</p>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <Input
            type="number"
            value={ff_value}
            onChange={(e) => handleChange(e, `${key}_ff`)}
            className="bg-black text-yellow-200 border border-gray-600 px-2 py-1 rounded"
            placeholder="FF"
          />
        </div>
      </div>
      {values.map((row, i) => (
        <div key={i} className="mb-2">
          <p className="text-sm text-yellow-300 mb-1">
            {["Position", "Velocity", "Acceleration"][i]}
          </p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            {row.map((val, j) => (
              <Input
                key={j}
                type="number"
                value={val}
                onChange={(e) => handleChange(e, `${key}_pid_constants`, i, j)}
                className="bg-black text-yellow-200 border border-gray-600 px-2 py-1 rounded"
                placeholder={["P", "I", "D"][j]}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  if (!config) {
    return (
      <div className="text-center text-yellow-300 mt-10">
        Loading configuration...
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center animate-fade-in">
        Configuration
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {renderPID(
          "Roll PID Constants",
          "roll",
          config.roll_ff,
          config.roll_pid_constants
        )}
        {renderPID(
          "Pitch PID Constants",
          "pitch",
          config.pitch_ff,
          config.pitch_pid_constants
        )}
        {renderPID(
          "Throttle PID Constants",
          "throttle",
          config.throttle_ff,
          config.throttle_pid_constants
        )}
        {renderPID(
          "Yaw PID Constants",
          "yaw",
          config.yaw_ff,
          config.yaw_pid_constants
        )}
      </div>

      <div className="mt-10 bg-gray-800 rounded-lg p-4 shadow-md">
        <h3 className="text-yellow-400 text-lg mb-2 font-mono">Code Editor</h3>
        <Textarea
          value={config.code}
          onChange={(e) => handleChange(e, "code")}
          className="w-full h-40 bg-black text-yellow-200 border border-gray-600 p-2 font-mono"
        />
        <pre className="mt-4 p-4 rounded bg-gray-900 overflow-auto text-sm">
          <code className="language-python whitespace-pre-wrap">
            {config.code}
          </code>
        </pre>
      </div>

      <div className="text-center mt-8">
        <Button
          onClick={handleSubmit}
          className="bg-yellow-500 hover:bg-yellow-600"
        >
          Save Configuration
        </Button>
      </div>
    </div>
  );
}
