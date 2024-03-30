import EditPostModal from "../modals/EditPostModal";



interface ModalProviderProps {

}

const ModalProvider: React.FC<ModalProviderProps> = ({}) => {
  return (
    <div>
        <EditPostModal/>
    </div>
  );
};

export default ModalProvider;
