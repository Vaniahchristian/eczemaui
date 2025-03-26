"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function AdminUsers() {
  const dummyUsers = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@example.com",
      role: "Doctor",
      specialization: "Dermatology",
      status: "Active",
      joinDate: "2024-12-01"
    },
    {
      id: 2,
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Patient",
      status: "Active",
      joinDate: "2025-01-15"
    },
    {
      id: 3,
      name: "Dr. Michael Chen",
      email: "michael.chen@example.com",
      role: "Doctor",
      specialization: "Pediatric Dermatology",
      status: "Pending",
      joinDate: "2025-03-20"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button>Add New User</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Search by name" />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <select className="w-full px-3 py-2 border rounded-md">
                <option value="">All Roles</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select className="w-full px-3 py-2 border rounded-md">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <Label htmlFor="date">Join Date</Label>
              <Input id="date" type="date" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {dummyUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-sm text-gray-500">Joined: {user.joinDate}</p>
                </div>
                <div className="text-right">
                  <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                    {user.status}
                  </Badge>
                  <p className="mt-1 font-medium">{user.role}</p>
                  {user.specialization && (
                    <p className="text-sm text-gray-500">{user.specialization}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm">Reset Password</Button>
                {user.status === "Pending" && (
                  <Button size="sm">Approve</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
