"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Input } from "../ui/Input";
import { Label } from "../ui/label";
import { DialogClose } from "@radix-ui/react-dialog";

interface TextareaDialogProps {
  dialogButtonTitle: string;
  dialogTitle: string;
  dialogDesc?: string;
  value: any;
  secondaryValue?: any;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  // onSubmit: () => void;
  onClick: () => void;
  secondaryInput: boolean;
  label: string;
  labelSecondary?: string;
  name: string;
  secondaryName?: string;
}

const TextareaDialog = ({
  dialogButtonTitle,
  dialogTitle,
  dialogDesc,
  inputRef,
  secondaryInput,
  value,
  secondaryValue,
  label,
  labelSecondary,
  onChange,
  name,
  onClick,
  secondaryName,
}: // onSubmit,
TextareaDialogProps) => {
  // const [link, setLink] = useState(value);
  // const [alias, setAlias] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="border-none w-fit h-fit bg-neutral-700 hover:bg-neutral-700"
          variant="outline"
        >
          {dialogButtonTitle}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-neutral-800 border-none">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {dialogDesc}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="link" className="text-right">
              {label}
            </Label>
            <Input
              id="name"
              name={name}
              // onChange={(e) => {
              //   setLink(e.target.value);
              // }}
              onChange={onChange}
              value={value}
              className="col-span-3 border-none bg-neutral-700 ring-offset-emerald-600"
            />

            {secondaryInput && (
              <>
                <Label htmlFor="alias" className="text-right">
                  {labelSecondary}
                </Label>
                <Input
                  id="name"
                  name={secondaryName}
                  // onChange={(e) => {
                  //   setAlias(e.target.value);
                  // }}
                  // value={alias}
                  value={secondaryValue}
                  onChange={onChange}
                  className="col-span-3 border-none bg-neutral-700 ring-offset-emerald-600"
                />
              </>
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              // onClick={() => {
              //   //@ts-ignore
              //   inputRef.current.value += `[${link} ${alias}]`;
              // }}
              onClick={onClick}
              type="button"
            >
              OK
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TextareaDialog;
