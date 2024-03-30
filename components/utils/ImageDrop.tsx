import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BsImage } from "react-icons/bs";
import { AspectRatio } from "../ui/aspect-ratio";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { BiImageAdd } from 'react-icons/bi'

type Variant = "pfp" | "cover";

interface DropzoneProps {
  onChange: (base64: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
  type?: Variant;
}

const ImageDrop: React.FC<DropzoneProps> = ({
  onChange,
  label,
  value,
  disabled,
  type = "cover",
}) => {
  const [base64, setBase64] = useState(value);

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const maxFileSize = 10 * 1024 * 1024; // 5 MB in bytes

      if (file && file.size <= maxFileSize) {
        
        //console.log("File is within the size limit:", file);
      }
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <div
      {...getRootProps({  })}
    >
      <input {...getInputProps()} />
      {type === "cover" ? (
        <div className="my-8 border-2 rounded-lg border-dashed dark:border-muted-foreground ">
          <div className="w-full p-4 text-[#7D8590] border-b">
            <div className="">{label}</div>
          </div>
          <div className=" bg-[#F6F8FA] dark:bg-[#1f2a38] flex flex-col gap-y-4 items-center justify-center w-full text-gray-600  px-16 py-4">
            {base64 ? (
              <>
                <AspectRatio
                  ratio={16 / 9}
                  className=" relative rounded-md bg-muted"
                >
                  <Image
                    src={base64}
                    alt={label}
                    fill
                    className="rounded-md object-cover"
                  />
                  <X
                    onClick={() => setBase64("")}
                    className="transition duration-300 ease-in-out cursor-pointer bg-black dark:hover:bg-red-400/30 absolute right-0 -top-1 dark:bg-red-400 text-white rounded-full p-1"
                  />
                </AspectRatio>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-y-4">
                <BsImage size={44} />
                <div className="dark:text-neutral-400">Add a file</div>
              </div>
            )}

            <Button className="flex items-center gap-2 bg-sky-500 dark:text-white">
              <UploadCloud />
              <div>Upload Photo</div>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center justify-center">
           <div className="relative w-fit rounded-full border-sky-500 border-2 border-dashed">
                <Avatar className="h-[5rem] w-[5rem] border-2   rounded-full ">
                  <AvatarImage
                    src={base64 ? base64 : '/placeholder.jpg'}
                    alt="profile_pic"
                    className="rounded-full"
                  />
                </Avatar>
                <div className="absolute z-66 bottom-0 right-0 p-1 rounded-full border-2 bg-white text-black ">
                  <BiImageAdd size={20} />
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ImageDrop;
