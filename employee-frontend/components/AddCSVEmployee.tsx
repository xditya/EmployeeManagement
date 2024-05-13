import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaFileArrowDown } from "react-icons/fa6";
export function AddCSVEmployee() {
  const addCSVEmployee = () => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Import CSV</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Employees using CSV</DialogTitle>
          <DialogDescription>
            Choose the CSV file which contains the Employees Data
          </DialogDescription>
        </DialogHeader>
        <form action="">
          <DialogFooter>
            <Button onClick={addCSVEmployee} type="submit">
              <input type="file" className="hidden" /> Import CSV{" "}
              <FaFileArrowDown className="ml-2" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
