"use client"

import { useState } from "react"
import { Mic, MicOff, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"

export function EncounterForm() {
  const [isListening, setIsListening] = useState(false)
  const [problems, setProblems] = useState([
    {
      id: 1,
      namasteCode: "AYUSH.NS.001",
      namasteName: "Nidranasha",
      icd11Code: "7A00.0",
      icd11Name: "Insomnia disorder",
    },
  ])
  const [notes, setNotes] = useState("")

  const handleVoiceNotes = () => {
    setIsListening(!isListening)
    if (!isListening) {
      setTimeout(() => {
        setNotes(notes + " Patient shows Vata dosha imbalance with Pitta aggravation.")
        setIsListening(false)
      }, 2000)
    }
  }

  const addProblem = () => {
    setProblems([
      ...problems,
      {
        id: Date.now(),
        namasteCode: "",
        namasteName: "",
        icd11Code: "",
        icd11Name: "",
      },
    ])
  }

  const removeProblem = (id: number) => {
    setProblems(problems.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Encounter Form</h1>
        <p className="text-gray-600">Create a new patient encounter with dual coding</p>
      </div>

      {/* Patient Details */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patientName">Patient Name</Label>
              <Input id="patientName" placeholder="Enter patient name" />
            </div>
            <div>
              <Label htmlFor="abhaId">ABHA ID (Optional)</Label>
              <Input id="abhaId" placeholder="Enter ABHA ID" />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" placeholder="Enter age" />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Input id="gender" placeholder="Enter gender" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Problem List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Problem List (Dual Coding)</CardTitle>
            <Button onClick={addProblem} size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Problem
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {problems.map((problem, index) => (
            <div key={problem.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Problem #{index + 1}</span>
                {problems.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removeProblem(problem.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>NAMASTE Code</Label>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-amber-100 text-amber-800">AYUSH</Badge>
                    <Input
                      placeholder="AYUSH.XX.XXX"
                      value={problem.namasteCode}
                      onChange={(e) => {
                        const updated = problems.map((p) =>
                          p.id === problem.id ? { ...p, namasteCode: e.target.value } : p,
                        )
                        setProblems(updated)
                      }}
                    />
                  </div>
                  <Input
                    placeholder="NAMASTE diagnosis name"
                    value={problem.namasteName}
                    onChange={(e) => {
                      const updated = problems.map((p) =>
                        p.id === problem.id ? { ...p, namasteName: e.target.value } : p,
                      )
                      setProblems(updated)
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label>ICD-11 Code</Label>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-blue-100 text-blue-800">ICD-11</Badge>
                    <Input
                      placeholder="7A00.0"
                      value={problem.icd11Code}
                      onChange={(e) => {
                        const updated = problems.map((p) =>
                          p.id === problem.id ? { ...p, icd11Code: e.target.value } : p,
                        )
                        setProblems(updated)
                      }}
                    />
                  </div>
                  <Input
                    placeholder="ICD-11 diagnosis name"
                    value={problem.icd11Name}
                    onChange={(e) => {
                      const updated = problems.map((p) =>
                        p.id === problem.id ? { ...p, icd11Name: e.target.value } : p,
                      )
                      setProblems(updated)
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Clinical Notes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Clinical Notes</CardTitle>
            <Button variant={isListening ? "destructive" : "outline"} onClick={handleVoiceNotes} size="sm">
              {isListening ? <MicOff className="w-4 h-4 mr-1" /> : <Mic className="w-4 h-4 mr-1" />}
              {isListening ? "Stop Dictation" : "Voice Dictation"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter clinical notes, Prakriti assessment, Dosha imbalance details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
            />
            {isListening && (
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-700 text-sm">Recording clinical notes...</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex space-x-4">
        <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
          Save Encounter
        </Button>
        <Button variant="outline" size="lg">
          Save as Draft
        </Button>
        <Button variant="ghost" size="lg">
          Cancel
        </Button>
      </div>
    </div>
  )
}
