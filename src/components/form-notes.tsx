import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Notes } from "./card-notes";

export function FormNotes({
  setItems,
}: {
  setItems: React.Dispatch<React.SetStateAction<Notes[]>>;
}) {
  const [text, setText] = useState<{
    title?: string;
    body?: string;
  }>({
    title: "",
    body: "",
  });

  //   Limit karakter
  const maxCharacterLimit = 50;

  // Fungsi untuk mendapatkan inputan untuk judul catatan
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxCharacterLimit) {
      setText({ ...text, title: newText });
    }
  };

  // Fungsi untuk mendapatkan inputan untuk body catatan
  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText({ ...text, body: newText });
  };

  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newItem: Notes = {
      id: new Date().getTime(),
      title: text.title!,
      body: text.body ? text.body : undefined,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setText({
      title: "",
      body: "",
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleAddItem}>
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="textInput">Judul</Label>
        <Input
          type="text"
          id="textInput"
          required
          value={text.title}
          onChange={handleTitleChange}
          placeholder="Tuliskan teks di sini"
        />
        <CardDescription>
          Jumlah karakter yang tersisa: {maxCharacterLimit - text.title!.length}
        </CardDescription>
      </div>

      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="textInput">Isi</Label>
        <Textarea
          value={text.body}
          onChange={handleBodyChange}
          placeholder="Tuliskan teks di sini"
        />
      </div>

      <Button type="submit" className="w-full">
        Tambahkan
      </Button>
    </form>
  );
}
