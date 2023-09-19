import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { showFormattedDate } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LockClosedIcon,
  LockOpen1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";

export interface Notes {
  id: number;
  title: string;
  body?: string;
  createdAt: string;
  archived: boolean;
}

interface CardNotes extends Notes {
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
  onEdit?: React.MouseEventHandler<HTMLButtonElement>;
}

export function CardNotes({
  title,
  body,
  createdAt,
  archived,
  onDelete,
  onEdit,
}: CardNotes) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {" "}
          {archived === true ? (
            <Badge className="w-fit">Arsip</Badge>
          ) : null}{" "}
          {title}
        </CardTitle>
        <CardDescription>{showFormattedDate(createdAt)}</CardDescription>
      </CardHeader>

      <CardContent>
        <CardDescription>{body}</CardDescription>
      </CardContent>
      <CardFooter className="space-x-4">
        <Button variant={"destructive"} onClick={onDelete}>
          <TrashIcon />
          <span className="ml-2">Hapus</span>
        </Button>
        <Button onClick={onEdit} variant={archived ? "outline" : "secondary"}>
          {archived ? <LockOpen1Icon /> : <LockClosedIcon />}

          <span className="ml-2">{archived ? "Aktifkan" : "Arsipkan"}</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
