

interface FooterProps {

}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className="hidden text-xs mt-6 bg-neutral-100 dark:bg-neutral-800  dark:text-white p-2 text-center">
        &copy; 2023 Joshua Solo.{'  '} All rights reserved.
        <div className="flex space-x-8 text-muted-foreground justify-center text-center">
            <a className="underline" href="#">
                Terms of Service
            </a>
            <p className="">·</p>
            <a className="underline" href="#">
                Privacy Policy
            </a>
        </div>
    </div>
  );
};

export default Footer;