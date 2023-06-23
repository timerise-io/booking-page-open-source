import React from "react";
import { Typography } from "components/Typography";
import { useTranslation } from "react-i18next";
import { FileUploadStyledButton } from "./FileUploadStyledButton";

interface NoFileFileUploadContentProps {
  onClick: () => void;
}

const NoFileFileUploadContent = ({ onClick }: NoFileFileUploadContentProps) => {
  const { t } = useTranslation("forms");

  return (
    <FileUploadStyledButton
      type="button"
      onClick={() => {
        onClick();
      }}
    >
      <Typography className="button-text" typographyType="body" as="span">
        {t("upload-file")}
      </Typography>
    </FileUploadStyledButton>
  );
};

export default NoFileFileUploadContent;
