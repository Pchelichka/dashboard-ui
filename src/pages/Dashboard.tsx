import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const API_BASE = "http://localhost:8000";

export default function Dashboard() {
  const [allImages, setAllImages] = useState([]);
  const [nokImages, setNokImages] = useState([]);

  // Modal state: null = no preview, or { url, alt }
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/images/nok`).then((res) => setNokImages(res.data));
    axios.get(`${API_BASE}/images/all`).then((res) => setAllImages(res.data));
  }, []);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setPreviewImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const ImageGrid = ({ images }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {images.map((img) => (
        <Card
          key={img.filename}
          className="bg-gray-900 shadow-xl border border-gray-700 hover:shadow-yellow-400/40 transition-all duration-300 cursor-pointer"
          onClick={() => setPreviewImage({ url: img.url, alt: img.filename })}
        >
          <CardContent className="p-4">
            <img
              src={img.url}
              alt={img.filename}
              className="rounded-xl w-full h-auto object-cover transition-transform hover:scale-105 duration-300"
            />
            <p className="text-yellow-400 text-sm mt-2 font-mono">
              {img.result}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen flex flex-col relative">
      <main className="flex-grow px-6 py-10">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center animate-fade-in">
          Image Review
        </h1>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-gray-800 rounded-lg overflow-hidden shadow-md flex justify-center">
            <TabsTrigger
              value="all"
              className="px-6 m-1 py-2 text-sm font-medium text-white hover:bg-yellow-500 transition-all duration-200 data-[state=active]:bg-yellow-500"
            >
              All Images
            </TabsTrigger>
            <TabsTrigger
              value="nok"
              className="px-6 m-1 py-2 text-sm font-medium text-white hover:bg-yellow-500 transition-all duration-200 data-[state=active]:bg-yellow-500"
            >
              NOK Images
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ImageGrid images={allImages} />
          </TabsContent>
          <TabsContent value="nok">
            <ImageGrid images={nokImages} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 cursor-zoom-out"
          onClick={() => setPreviewImage(null)}
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
        >
          <div
            className="bg-gray-900 rounded-xl shadow-2xl p-4 max-w-[90vw] max-h-[90vh] flex flex-col items-center animate-fade-in cursor-auto"
            onClick={(e) => e.stopPropagation()} // prevent modal close on clicking card
            style={{ animationDuration: "0.35s" }}
          >
            <img
              src={previewImage.url}
              className="max-w-full max-h-[70vh] rounded-lg mb-4 object-contain"
            />
            <p className="text-yellow-400 font-mono text-center select-text break-all">
              {previewImage.alt}
            </p>
            <a
              href={previewImage.url}
              download={previewImage.alt || "image"}
              className="bg-yellow-400 text-black px-3 py-1 rounded-md shadow-md hover:bg-yellow-500 transition-colors duration-300 select-none"
              onClick={(e) => e.stopPropagation()} // prevent modal close on click
              target="_blank"
              title="Download Image"
            >
              Download
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
