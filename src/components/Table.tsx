import { useState } from 'react'
import { Trash2 } from 'lucide-react'

interface TableItem {
  id: string
  title: string
  topic: string
}

export default function Table() {
  const [items, setItems] = useState<TableItem[]>([
    {
      id: "1",
      title: "How to find suppliers",
      topic: "Supplier Outreach",
    },
    {
      id: "2",
      title: "Building a Shopify Store",
      topic: "Digital Storefront",
    },
  ])

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <div className="w-full px-20">
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left font-semibold text-gray-600 border-b">Title</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600 border-b">Topic</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600 border-b w-20">Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{item.title}</td>
              <td className="py-2 px-4">{item.topic}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={`Delete ${item.title}`}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

