import { Header } from "@/components/header";
import { initialData } from "@/lib/data";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardNotes, type Notes } from "@/components/card-notes";
import { useState } from "react";
import { DialogAddNotes } from "@/components/dialog-add-notes";
import { Button } from "@/components/ui/button";
import { Placeholder } from "@/components/placeholder";
import { Input } from "@/components/ui/input";
import { FilePlusIcon } from "@radix-ui/react-icons";

export default function App() {
  const [items, setItems] = useState<Notes[]>(initialData());

  // Fungsi untuk menghapus catatan
  const handleDeleteItem = (id: number) => {
    const updatedItems = items.filter((items) => items.id !== id);
    setItems([...updatedItems]);
  };

  // Fungsi untuk mengubah catatan
  const handleEditItem = (id: number, archived: boolean) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, archived: archived ? false : true } : item
    );

    setItems([...updatedItems]);
  };

  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fungsi untuk mendapatkan input pencarian
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Fungsi untuk menampilkan input pencarian
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header>
        <div className="flex items-center space-x-3">
          <div className="relative mx-auto">
            <Input
              type="search"
              placeholder="Cari catatan..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <DialogAddNotes setItems={setItems}>
            <Button>
              <FilePlusIcon/>
              <span className="ml-2">Tambah</span>
            </Button>
          </DialogAddNotes>
        </div>
      </Header>

      <main className="container mt-6">
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="active">Aktif</TabsTrigger>
            <TabsTrigger value="archived">Arsip</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div
              className={
                filteredItems.length < 1
                  ? ""
                  : "grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
              }>
              {filteredItems.length < 1 ? (
                <Placeholder />
              ) : (
                filteredItems.map((note, idx) => (
                  <CardNotes
                    {...note}
                    key={idx}
                    onDelete={() => {
                      handleDeleteItem(note.id);
                    }}
                    onEdit={() => {
                      handleEditItem(note.id, note.archived);
                    }}
                  />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="active">
            <div
              className={
                filteredItems.filter((f) => f.archived === false).length < 1
                  ? ""
                  : "grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
              }>
              {filteredItems.filter((f) => f.archived === false).length < 1 ? (
                <Placeholder />
              ) : (
                filteredItems
                  .filter((f) => f.archived === false)
                  .map((note, idx) => (
                    <CardNotes
                      {...note}
                      key={idx}
                      onDelete={() => {
                        handleDeleteItem(note.id);
                      }}
                      onEdit={() => {
                        handleEditItem(note.id, note.archived);
                      }}
                    />
                  ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="archived">
            <div
              className={
                filteredItems.filter((f) => f.archived === true).length < 1
                  ? ""
                  : "grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
              }>
              {filteredItems.filter((f) => f.archived === true).length < 1 ? (
                <Placeholder />
              ) : (
                filteredItems
                  .filter((f) => f.archived === true)
                  .map((note, idx) => (
                    <CardNotes
                      {...note}
                      key={idx}
                      onDelete={() => {
                        handleDeleteItem(note.id);
                      }}
                      onEdit={() => {
                        handleEditItem(note.id, note.archived);
                      }}
                    />
                  ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
