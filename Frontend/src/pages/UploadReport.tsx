import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import {
  Upload,
  FileText,
  Activity,
  Image,
  CheckCircle,
  CloudUpload,
  Droplet,
  Heart,
  Waves,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UploadReport = () => {
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const reportTypes = [
    {
      icon: Droplet,
      name: "Blood Test",
      description: "CBC, Lipid Profile, Thyroid, etc.",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      icon: Heart,
      name: "ECG / TMT",
      description: "Heart activity reports",
      color: "text-pink-500",
      bgColor: "bg-pink-50",
    },
    {
      icon: Waves,
      name: "Ultrasound",
      description: "Sonography reports",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Image,
      name: "X-Ray / Scan",
      description: "Medical imaging reports",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    toast({
      title: "Upload Successful",
      description: `${files.length} file(s) uploaded. Processing your report...`,
    });
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold mb-4">
            Upload Your Medical Report
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simply upload your report and let our AI analyze it for
            comprehensive insights
          </p>
        </div>

        {/* Upload Area */}
        <Card className="max-w-4xl mx-auto p-8 mb-12 bg-gradient-card shadow-medium">
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
              dragActive
                ? "border-primary bg-accent"
                : "border-border hover:border-primary hover:bg-accent/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-6">
              <div className="w-20 h-20 rounded-full bg-gradient-hero mx-auto flex items-center justify-center shadow-soft">
                <CloudUpload className="w-10 h-10 text-white" />
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-2">
                  Drag & Drop Your Files Here
                </h3>
                <p className="text-muted-foreground mb-6">
                  or click to browse from your device
                </p>
              </div>

              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileInput}
                accept=".pdf,.jpg,.jpeg,.png,.dcm"
                multiple
              />
              <label htmlFor="file-upload">
                <Button size="lg" className="cursor-pointer">
                  <Upload className="w-5 h-5 mr-2" />
                  Choose Files
                </Button>
              </label>

              <p className="text-sm text-muted-foreground">
                Supported formats: PDF, JPG, PNG (Max 20MB)
              </p>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>Instant Analysis</span>
            </div>
          </div>
        </Card>

        {/* Report Types */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Select Report Type for Better Analysis
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reportTypes.map((type, index) => (
              <Card
                key={index}
                className="p-6 cursor-pointer hover:shadow-medium transition-all group bg-gradient-card"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${type.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <type.icon className={`w-7 h-7 ${type.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{type.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {type.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Options */}
        <Card className="max-w-4xl mx-auto mt-12 p-8 bg-gradient-card">
          <h3 className="text-xl font-semibold mb-6">Additional Options</h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Doctor's Name (Optional)
              </label>
              <input
                type="text"
                placeholder="Enter prescribing doctor's name"
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Report Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="auto-analyze"
                className="w-5 h-5 rounded border-input text-primary focus:ring-primary"
                defaultChecked
              />
              <label htmlFor="auto-analyze" className="text-sm font-medium">
                Auto-analyze report and generate insights
              </label>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Link to="/dashboard" className="flex-1">
              <Button className="w-full" size="lg">
                <Activity className="w-5 h-5 mr-2" />
                Upload & Analyze
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Save Draft
            </Button>
          </div>
        </Card>

        {/* Import from Other Sources */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Or import from other sources
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Google Drive
            </Button>
            <Button variant="outline" size="sm">
              <Activity className="w-4 h-4 mr-2" />
              Apple Health
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              ABHA
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadReport;
