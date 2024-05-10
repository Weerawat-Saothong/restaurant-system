import { FileUnknownOutlined } from "@ant-design/icons";
import { Image, UploadFile } from "antd";
import { TYPE_FILES } from "../common/constants/type-files";

const CHECKTYPEIMAGE = (file: UploadFile<any>) => {
  const fileExtension = file.name.split(".").pop() || "";

  const fileTypes = [
    {
      types: [...TYPE_FILES.TYPE.ARR_FILE_PNG, "png"],
      imagePath: "PNG_file_icon.png",
      alt: "PNG",
    },
    {
      types: [...TYPE_FILES.TYPE.ARR_FILE_JPG, "jpg", "jpeg"],
      imagePath: "JPG_file_icon.png",
      alt: "JPG",
    },
    {
      types: [...TYPE_FILES.TYPE.ARR_FILE_TYPES_PDF, "pdf"],
      imagePath: "PDF_file_icon.png",
      alt: "PDF",
    },
    {
      types: [...TYPE_FILES.TYPE.ARR_FILE_TYPES_WORD, "doc", "docx"],
      imagePath: "WORD_file_icon.png",
      alt: "WORD",
    },
    {
      types: [...TYPE_FILES.TYPE.ARR_FILE_TYPES_EXCEL, "xls", "xlsx"],
      imagePath: "EXCEL_file_icon.png",
      alt: "EXCEL",
    },
    {
      types: [...TYPE_FILES.TYPE.ARR_FILE_TYPES_TXT, "txt"],
      imagePath: "TXT_file_icon.png",
      alt: "TXT",
    },
    {
      types: [...TYPE_FILES.TYPE.ARR_FILE_TYPES_PPT, "ppt"],
      imagePath: "PPT_file_icon.png",
      alt: "PPT",
    },
    {
      types: [...TYPE_FILES.TYPE.ARR_FILE_TYPES_MP4, "mp4"],
      imagePath: "MP4_file_icon.png",
      alt: "MP4",
    },
  ];

  for (const fileType of fileTypes) {
    if (
      fileType.types.includes(file.type || "") ||
      fileType.types.includes(fileExtension)
    ) {
      return (
        <Image
          src={`/images/${fileType.imagePath}`}
          preview={false}
          width={"75%"}
          alt={fileType.alt}
        />
      );
    }
  }

  return <FileUnknownOutlined style={{ fontSize: "40px" }} />;
};

export { CHECKTYPEIMAGE };
