import React, { useEffect } from "react";
import { usePDF } from "@react-pdf/renderer";
import { AiOutlineFilePdf } from "react-icons/ai";
import MyDoc from "./MyDoc";

function Recu({ selectedRow }) {
  const [instance, updateInstance] = usePDF({
    document: <MyDoc selectedRow={selectedRow}></MyDoc>,
  });

  useEffect(() => {
    updateInstance(<MyDoc selectedRow={selectedRow}></MyDoc>);
  }, [selectedRow, updateInstance]);

  return (
    <a
      href={instance.url}
      download="recu.pdf"
      className="btn btn-warning btn-sm mb-2"
    >
      <AiOutlineFilePdf /> Générer un réçu
    </a>
  );
}

export default Recu;
