import React from "react";

const Record = ({ recordId, partnerId }) => {
  // const handleRowClick = (recordId, partnerId) => {
  //   const url = new URL("https://api.skilla.ru/mango/getRecord");
  //   url.searchParams.append("record", recordId);
  //   url.searchParams.append("partnership_id", partnerId);

  //   fetch(url)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok " + response.statusText);
  //       }
  //       return response.blob(); // предполагаем, что API возвращает файл
  //     })
  //     .then((blob) => {
  //       // Обработка полученного файла, например, можно скачать его
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement("a");
  //       a.style.display = "none";
  //       a.href = url;
  //       a.download = `record-${recordId}.mp3`; // Название файла
  //       document.body.appendChild(a);
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //       console.log("asd", blob);
  //     })
  //     .catch((error) => {
  //       console.error(
  //         "There has been a problem with your fetch operation:",
  //         error
  //       );
  //     });
  //   handleRowClick(recordId, partnerId);
  // };

  return (
    <div className="record">
      <span> recordId: {recordId} </span>
    </div>
  );
};

export default Record;
