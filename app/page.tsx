"use client"

import { useStatus, usePowerSync } from "@powersync/react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function Page() {
  // Hook
  const powersync = usePowerSync()

  // Get database status information e.g. downloading, uploading and lastSycned dates
  const status = useStatus()
  
  const [lists, setLists] = useState([])
  const [newListName, setNewListName] = useState("")
  
  // Function to fetch all lists
  const fetchLists = async () => {
    powersync.getAll('SELECT * from lists').then(setLists)
  }
  
  useEffect(() => {
    // Initial fetch of lists
    fetchLists()
    console.log("🚀 ~ Page ~ status:", status)

    // This was the original test insert, keeping it for reference
    // const insert = async () => {
    //   await powersync.execute("INSERT INTO lists (id, created_at, name, owner_id) VALUES (?, ?, ?, ?)", [1233, new Date(), "Test", "Test"]);
    // }
    // insert()
  }, [status])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!newListName.trim()) return

    // Generate a random ID (in a real app, you might want a more robust ID generation)
    const newId = Math.floor(Math.random() * 1000000)

    try {
      await powersync.execute(
        "INSERT INTO lists (id, created_at, name, owner_id) VALUES (?, ?, ?, ?)",
        [newId, new Date().toISOString(), newListName, "test-user"], // Using "User" as a placeholder owner_id
      )

      // Clear the input field
      setNewListName("")

      // Refresh the list
      await fetchLists()
    } catch (error) {
      console.error("Error creating new list:", error)
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Test App</h1>

      {/* Add new list form */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="listName" className="block text-sm font-medium mb-1">
                New List Name
              </label>
              <div className="flex gap-2">
                <Input
                  id="listName"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="Enter list name"
                  required
                />
                <Button type="submit">Add</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Lists display */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Your Lists</h2>
        {lists.length === 0 ? (
          <p className="text-muted-foreground">No lists yet. Create your first list above!</p>
        ) : (
          <ul className="space-y-2">
            {lists.map((list) => (
              <li key={list.id} className="p-3 bg-muted rounded-md">
                {list.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
