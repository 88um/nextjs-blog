"use client";

import {
  ArrowRight,
  ArrowRightFromLine,
  MoveLeft,
  MoveRight,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";



interface PagerProps {
    hasNext : boolean;
    totalPages : number;
    page : number;
    limit: number;
}

const Pager: React.FC<PagerProps> = ({hasNext, totalPages, page, limit}) => {
  const router = useRouter();
  const pathname = usePathname();
 
  const hideBack = Number(page) - 1 === 0;


  const onBack = () => {
    router.push(`${pathname}?page=${Number(page) - 1}&limit=${limit}`);
  };

  const onNext = () => {
    router.push(`${pathname}?page=${Number(page) + 1}&limit=${limit}`);
  };

  return (
    <div className="flex justify-center text-muted-foreground text-sm font-medium pt-16 mb-8">
      <div className="flex items-center gap-x-4 justify-between">
        <div>
          <Button
            variant="ghost"
            className={hideBack ? "hidden" : " flex items-center space-x-2"}
            onClick={onBack}
          >
            <MoveLeft />
            <p className="">Previous</p>
          </Button>
        </div>
        <div>
          Page {page} / {totalPages}
        </div>
        <div>
          <Button
            variant="ghost"
            className={!hasNext ? "hidden" : " flex items-center space-x-2"}
            onClick={onNext}
          >
            <p>Next</p>
            <MoveRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pager;
