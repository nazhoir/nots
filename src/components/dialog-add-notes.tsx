import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormNotes } from "./form-notes";
import { Notes } from "./card-notes";

export function DialogAddNotes({
  children,
  setItems,
}: {
  children?: React.ReactNode;
  setItems: React.Dispatch<React.SetStateAction<Notes[]>>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Catatan Baru</DialogTitle>
          <DialogDescription>
            Buat catatan baru untuk terus mengingatkan kamu.
          </DialogDescription>
        </DialogHeader>
        <FormNotes setItems={setItems} />
      </DialogContent>
    </Dialog>
  );
}
