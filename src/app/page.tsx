"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Camera, Activity, AlertCircle, CheckCircle2, Ruler, Eye } from "lucide-react";

export default function Home() {
  const [leftCameraActive, setLeftCameraActive] = useState(false);
  const [rightCameraActive, setRightCameraActive] = useState(false);
  const [cableHeight, setCableHeight] = useState(0);
  const heightThreshold = 2.5; // mm - Maximum allowed cable height
  const [detectionStatus, setDetectionStatus] = useState<"idle" | "detecting" | "pass" | "fail">("idle");
  const [baseline, setBaseline] = useState([65]); // mm - distance between cameras
  const [focalLength, setFocalLength] = useState([3.6]); // mm

  const handleStartDetection = () => {
    setDetectionStatus("detecting");
    setLeftCameraActive(true);
    setRightCameraActive(true);
    
    // Simulate detection process
    setTimeout(() => {
      const simulatedHeight = Math.random() * 5; // Random height between 0-5mm
      setCableHeight(simulatedHeight);
      setDetectionStatus(simulatedHeight > heightThreshold ? "fail" : "pass");
    }, 2000);
  };

  const handleReset = () => {
    setDetectionStatus("idle");
    setCableHeight(0);
    setLeftCameraActive(false);
    setRightCameraActive(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
            <Eye className="h-8 w-8" />
            Visión Estereoscópica PCB
          </h1>
          <p className="text-muted-foreground">
            Sistema de detección de altura de cable LED en aplicaciones industriales
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Camera Feeds */}
          <div className="lg:col-span-2 space-y-4">
            {/* Status Bar */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge 
                      variant={detectionStatus === "fail" ? "destructive" : detectionStatus === "pass" ? "default" : "secondary"}
                      className="px-4 py-2 text-lg"
                    >
                      {detectionStatus === "idle" && "En Espera"}
                      {detectionStatus === "detecting" && "Detectando..."}
                      {detectionStatus === "pass" && (
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" /> Aprobado
                        </span>
                      )}
                      {detectionStatus === "fail" && (
                        <span className="flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" /> Falla Detectada
                        </span>
                      )}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Ruler className="h-5 w-5" />
                      <span className="text-2xl font-bold">
                        {cableHeight.toFixed(2)} mm
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleStartDetection} 
                      disabled={detectionStatus === "detecting"}
                      size="lg"
                    >
                      <Activity className="mr-2 h-4 w-4" />
                      {detectionStatus === "detecting" ? "Detectando..." : "Iniciar Detección"}
                    </Button>
                    <Button 
                      onClick={handleReset} 
                      variant="outline"
                      size="lg"
                    >
                      Reiniciar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Camera Feeds */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Camera */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Cámara Izquierda
                    {leftCameraActive && (
                      <Badge variant="default" className="ml-auto">
                        <Activity className="h-3 w-3 mr-1 animate-pulse" />
                        Activo
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-800 rounded-lg relative overflow-hidden">
                    {leftCameraActive ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-full bg-gradient-to-br from-blue-900 to-gray-900 relative">
                          {/* Simulated PCB view */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-32 h-32 border-4 border-green-500 rounded-lg bg-green-900/30">
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                              </div>
                              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-yellow-400" />
                            </div>
                          </div>
                          <div className="absolute bottom-4 left-4 text-xs text-white/70">
                            Vista estereoscópica izquierda
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white/50">
                        <div className="text-center">
                          <Camera className="h-12 w-12 mx-auto mb-2" />
                          <p>Cámara inactiva</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Right Camera */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Cámara Derecha
                    {rightCameraActive && (
                      <Badge variant="default" className="ml-auto">
                        <Activity className="h-3 w-3 mr-1 animate-pulse" />
                        Activo
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-800 rounded-lg relative overflow-hidden">
                    {rightCameraActive ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-full bg-gradient-to-br from-blue-900 to-gray-900 relative">
                          {/* Simulated PCB view - slightly offset for stereo effect */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-2">
                            <div className="w-32 h-32 border-4 border-green-500 rounded-lg bg-green-900/30">
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                              </div>
                              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-yellow-400" />
                            </div>
                          </div>
                          <div className="absolute bottom-4 left-4 text-xs text-white/70">
                            Vista estereoscópica derecha
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white/50">
                        <div className="text-center">
                          <Camera className="h-12 w-12 mx-auto mb-2" />
                          <p>Cámara inactiva</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Depth Map Visualization */}
            <Card>
              <CardHeader>
                <CardTitle>Mapa de Profundidad</CardTitle>
                <CardDescription>Visualización de altura calculada mediante triangulación estereoscópica</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-800 rounded-lg relative overflow-hidden">
                  {leftCameraActive && rightCameraActive ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 relative">
                        {/* Depth visualization */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-32 h-32 border-4 border-white/30 rounded-lg bg-white/10">
                            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-gradient-to-t from-yellow-400 to-red-500 shadow-lg [filter:drop-shadow(0_0_10px_rgba(255,200,0,0.8))]" />
                            {detectionStatus !== "idle" && (
                              <div className="absolute -right-16 top-1/4 bg-black/75 px-2 py-1 rounded text-xs text-white whitespace-nowrap">
                                {cableHeight.toFixed(2)}mm
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 text-xs text-white/70">
                          Mapa de disparidad estéreo
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/50">
                      <div className="text-center">
                        <Eye className="h-12 w-12 mx-auto mb-2" />
                        <p>Esperando activación de cámaras</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Settings and Info */}
          <div className="space-y-4">
            {/* Calibration Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Calibración</CardTitle>
                <CardDescription>Parámetros del sistema estereoscópico</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Línea Base: {baseline[0]} mm
                  </label>
                  <Slider
                    value={baseline}
                    onValueChange={setBaseline}
                    min={50}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Distancia entre cámaras
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Distancia Focal: {focalLength[0]} mm
                  </label>
                  <Slider
                    value={focalLength}
                    onValueChange={setFocalLength}
                    min={2}
                    max={8}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Longitud focal de las lentes
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Umbral de Falla:</span>
                    <Badge variant="outline">{heightThreshold} mm</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Altura máxima permitida del cable
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Detection Information */}
            <Card>
              <CardHeader>
                <CardTitle>Información de Detección</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="status" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="status">Estado</TabsTrigger>
                    <TabsTrigger value="info">Info</TabsTrigger>
                  </TabsList>
                  <TabsContent value="status" className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Cámara Izquierda:</span>
                        <Badge variant={leftCameraActive ? "default" : "secondary"}>
                          {leftCameraActive ? "Activa" : "Inactiva"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Cámara Derecha:</span>
                        <Badge variant={rightCameraActive ? "default" : "secondary"}>
                          {rightCameraActive ? "Activa" : "Inactiva"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">LED Detectado:</span>
                        <Badge variant={detectionStatus !== "idle" ? "default" : "secondary"}>
                          {detectionStatus !== "idle" ? "Sí" : "No"}
                        </Badge>
                      </div>
                    </div>
                    <div className="pt-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Confianza de Medición:</span>
                          <span>{detectionStatus !== "idle" ? "95%" : "0%"}</span>
                        </div>
                        <Progress value={detectionStatus !== "idle" ? 95 : 0} />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="info" className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      <strong>Sistema:</strong> Visión estereoscópica dual
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Aplicación:</strong> Detección de modo de falla industrial
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Objetivo:</strong> Medir altura de cable conectado a LED en PCB
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Método:</strong> Triangulación estereoscópica
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Algorithm Info */}
            <Card>
              <CardHeader>
                <CardTitle>Principio de Operación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  La visión estereoscópica utiliza dos cámaras para capturar imágenes desde diferentes ángulos.
                </p>
                <p>
                  Al comparar la disparidad (diferencia de posición) del mismo punto en ambas imágenes, 
                  se calcula la profundidad mediante triangulación.
                </p>
                <p className="pt-2 font-mono text-xs bg-muted p-2 rounded">
                  Z = (f &times; B) / d
                  <br />
                  <span className="text-xs">donde f=focal, B=baseline, d=disparidad</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
