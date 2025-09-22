"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Users, Database, CheckCircle, Shield, Activity } from "lucide-react"

const ayushDiagnosesData = [
  { diagnosis: "Nidranasha", count: 245, percentage: 18 },
  { diagnosis: "Amlapitta", count: 189, percentage: 14 },
  { diagnosis: "Kasa", count: 156, percentage: 12 },
  { diagnosis: "Jwara", count: 298, percentage: 22 },
  { diagnosis: "Arsha", count: 167, percentage: 12 },
  { diagnosis: "Prameha", count: 145, percentage: 11 },
  { diagnosis: "Vatavyadhi", count: 123, percentage: 9 },
]

const mappingCoverageData = [
  { category: "Respiratory", mapped: 245, total: 280, percentage: 87 },
  { category: "Digestive", mapped: 298, total: 320, percentage: 93 },
  { category: "Neurological", mapped: 167, total: 185, percentage: 90 },
  { category: "Metabolic", mapped: 189, total: 210, percentage: 90 },
  { category: "Musculoskeletal", mapped: 156, total: 195, percentage: 80 },
]

const insuranceData = [
  { status: "Eligible", count: 1250, color: "#10b981" },
  { status: "Pending", count: 340, color: "#f59e0b" },
  { status: "Not Eligible", count: 180, color: "#ef4444" },
]

const departmentData = [
  { name: "Ayurveda", value: 35, color: "#0891b2" },
  { name: "Unani", value: 25, color: "#dc2626" },
  { name: "Siddha", value: 20, color: "#f59e0b" },
  { name: "Homeopathy", value: 15, color: "#4b5563" },
  { name: "Yoga & Naturopathy", value: 5, color: "#164e63" },
]

const usageData = [
  { month: "Jan", searches: 1200, translations: 890 },
  { month: "Feb", searches: 1450, translations: 1020 },
  { month: "Mar", searches: 1680, translations: 1180 },
  { month: "Apr", searches: 1920, translations: 1350 },
  { month: "May", searches: 2100, translations: 1480 },
  { month: "Jun", searches: 2350, translations: 1650 },
]

export function AnalyticsDashboard() {
  return (
    <section id="analytics" className="py-20 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Analytics & Insights</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time analytics on code mapping coverage, usage patterns, and system performance
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total NAMASTE Codes</p>
                  <p className="text-2xl font-bold">4,523</p>
                </div>
                <Database className="h-8 w-8 text-cyan-600" />
              </div>
              <div className="mt-4">
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                  +12% this month
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mapping Coverage</p>
                  <p className="text-2xl font-bold">89.2%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="mt-4">
                <Progress value={89.2} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Practitioners</p>
                  <p className="text-2xl font-bold">1,247</p>
                </div>
                <Users className="h-8 w-8 text-cyan-600" />
              </div>
              <div className="mt-4">
                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                  +8% this week
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Insurance Claims</p>
                  <p className="text-2xl font-bold">1,770</p>
                </div>
                <Shield className="h-8 w-8 text-amber-600" />
              </div>
              <div className="mt-4">
                <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-800">
                  +15% today
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Most Common AYUSH Diagnoses</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ayushDiagnosesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="diagnosis" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0891b2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Insurance Eligibility Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={insuranceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="count"
                    label={({ status, count }) => `${status}: ${count}`}
                  >
                    {insuranceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Mapping Coverage by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mappingCoverageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="percentage" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Department Usage Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Usage Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="searches" stroke="#0891b2" strokeWidth={2} />
                <Line type="monotone" dataKey="translations" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="text-green-700">High Coverage Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Digestive Disorders</span>
                  <span className="text-sm font-bold">93%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Neurological Conditions</span>
                  <span className="text-sm font-bold">90%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Metabolic Disorders</span>
                  <span className="text-sm font-bold">90%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader>
              <CardTitle className="text-yellow-700">Improvement Needed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Musculoskeletal</span>
                  <span className="text-sm font-bold">80%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Dermatological</span>
                  <span className="text-sm font-bold">75%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Ophthalmological</span>
                  <span className="text-sm font-bold">72%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="text-blue-700">System Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">API Response Time</span>
                  <span className="text-sm font-bold">120ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Search Accuracy</span>
                  <span className="text-sm font-bold">94.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">System Uptime</span>
                  <span className="text-sm font-bold">99.8%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
