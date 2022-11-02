import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import StyledInput from "components/StyledInput";
import StyledLabel from "components/StyledLabel";
import { Typography } from "components/Typography";
import { useField } from "formik";
import React, { ChangeEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { selectedSlotSelector } from "state/selectors/selectedSlotSelector";
import styled from "styled-components";

const ShortInput = styled(StyledInput)`
  max-width: 76px;
`;

interface QuantityFieldProps {
  label?: string;
  name: string;
  maxQuantity?: number | null;
}

const QuantityField: React.FC<QuantityFieldProps> = ({
  name,
  label,
  maxQuantity = 1,
}) => {
  const selectedSlot = useRecoilValue(selectedSlotSelector);
  const { t } = useTranslation(["forms"]);
  const labelToDisplay = label === undefined ? t(`${name}Field`) : label;

  const [, meta, helpers] = useField({ name });

  const { value } = meta;
  const { setValue, setTouched } = helpers;

  const maxValue =
    selectedSlot !== undefined && (maxQuantity ?? 1) > selectedSlot.quantity
      ? selectedSlot.quantity
      : maxQuantity ?? 1;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue === "") {
      setValue(0);
    }

    if (isNaN(+newValue) || isNaN(parseInt(newValue))) return;

    const newValueNum = parseInt(newValue);

    if (selectedSlot === undefined) {
      setValue(newValueNum);
      return;
    }

    if (newValueNum > maxValue) {
      setValue(maxValue);
      return;
    }

    setValue(newValueNum);
  };

  useEffect(() => {
    if (selectedSlot !== undefined && value > selectedSlot?.quantity) {
      setValue(0);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxValue, selectedSlot?.quantity]);

  return (
    <Column ai="stretch">
      <Row jc="flex-start">
        <Column w="100px" ai="flex-start">
          <StyledLabel htmlFor={name}>{labelToDisplay}</StyledLabel>
          <ShortInput
            id={name}
            value={value < 1 ? "" : value}
            onChange={handleChange}
            onBlur={() => {
              setTouched(true);
            }}
          />
        </Column>
        {selectedSlot !== undefined && (
          <Box mt={2.25} ml={1}>
            <Typography typographyType="body" as="span">
              {t("maxSlots", { maxValue })}
            </Typography>
          </Box>
        )}
      </Row>
      <Box h="13px" mt={0.5} mb={1}>
        {meta.error && meta.touched && (
          <Typography typographyType="label" as="span" color="error">
            {meta.error}
          </Typography>
        )}
      </Box>
    </Column>
  );
};

export default QuantityField;
