import { useState } from "react";
import Modal from "../../components/Modal/Modal";

function ModalPage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen((prev) => !prev)}>open modal</button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="my modal"
        modalContent={
          <>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            dolore asperiores laboriosam error voluptatum fugiat, sit
            perferendis laborum et praesentium dolor modi fuga. Magni quo
            laborum amet qui numquam ipsam iusto aut aspernatur, adipisci sunt
            alias, maiores minima rerum earum cupiditate ipsum saepe rem.
            Necessitatibus, alias. Fugit esse voluptate odit necessitatibus
            voluptates optio hic quam eos, eum maiores ipsum libero voluptas ex
            impedit consequatur totam dolores beatae tempore! Ratione eos
            dolores debitis sint laborum unde, iure explicabo pariatur! Facilis
            dolor a eum sapiente deserunt, error animi mollitia minima, nihil
            maiores accusantium. Fugit consequuntur nam dicta assumenda soluta
            cupiditate nemo officia. assume form <button>submit</button>
          </>
        }
      />
    </>
  );
}

export default ModalPage;
