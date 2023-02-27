import CheckBox from "components/forms/CheckBox";
import FileUpload from "components/forms/FileUpload/FileUpload";
import NumberField from "components/forms/NumberField";
import PhoneSelect from "components/forms/PhoneSelect";
import QuantityField from "components/forms/QuantityField";
import GuestsList from "components/forms/GuestsList";
import SelectField from "components/forms/SelectField";
import TextField from "components/forms/TextField";
import { FormField } from "models/formFields";
import React from "react";
import { useTranslation } from "react-i18next";

interface FormComponentProps {
  config: FormField;
}

const FormComponent = ({ config }: FormComponentProps) => {
  const { t } = useTranslation(["forms"]);

  const optionalSuffix = t("optionalSuffix");

  const label = `${config.label}${config.required ? "" : optionalSuffix}`;

  switch (config.fieldType) {
    case "SYSTEM_FULL_NAME": {
      return (
        <TextField
          key={`booking-form-field-SYSTEM_FULL_NAME`}
          name="fullName"
          label={label}
          placeholder={config.placeholder}
        />
      );
    }
    case "SYSTEM_ALLOWLIST_CODE": {
      return (
        <TextField
          key={`booking-form-field-SYSTEM_ALLOWLIST_CODE`}
          name="code"
          label={label}
          placeholder={config.placeholder}
        />
      );
    }
    case "SYSTEM_PROMO_CODE": {
      return (
        <TextField
          key={`booking-form-field-SYSTEM_PROMO_CODE`}
          name="promoCode"
          label={label}
          placeholder={config.placeholder}
        />
      );
    }
    case "SYSTEM_PHONE_NUMBER": {
      return (
        <PhoneSelect
          key={`booking-form-field-SYSTEM_PHONE_NUMBER`}
          name="phone"
          label={label}
        />
      );
    }
    case "SYSTEM_EMAIL_ADDRESS": {
      return (
        <TextField
          key={`booking-form-field-SYSTEM_EMAIL_ADDRESS`}
          name="email"
          label={label}
          placeholder={config.placeholder}
        />
      );
    }
    case "SYSTEM_MESSAGE": {
      return (
        <TextField
          key={`booking-form-field-SYSTEM_MESSAGE`}
          name="message"
          label={label}
          multiline
          placeholder={config.placeholder}
        />
      );
    }
    case "SYSTEM_SLOT_QUANTITY": {
      return (
        <QuantityField
          key={`booking-form-field-SYSTEM_SLOT_QUANTITY`}
          name="quantity"
          label={label}
          maxQuantity={config.maxValue}
        />
      );
    }
    case "SYSTEM_GUESTS_LIST": {
      return (
        <GuestsList
          key={`booking-form-field-SYSTEM_GUESTS_LIST`}
          name="guestsList"
          label={label}
          minGuests={config.minGuests}
          maxGuests={config.maxGuests}
        />
      );
    }
    case "TEXT": {
      return (
        <TextField
          key={`booking-form-field-${config.fieldId}`}
          name={config.fieldId}
          label={label}
          placeholder={config.placeholder}
        />
      );
    }
    case "SELECT": {
      return (
        <SelectField
          key={`booking-form-field-${config.fieldId}`}
          name={config.fieldId}
          label={label}
          options={config.values.reduce((acc, item) => {
            return { ...acc, [item]: item };
          }, {})}
        />
      );
    }
    case "NUMBER": {
      return (
        <NumberField
          key={`booking-form-field-${config.fieldId}`}
          name={config.fieldId}
          label={label}
        />
      );
    }
    case "CHECKBOX": {
      return (
        <CheckBox
          key={`booking-form-field-${config.fieldId}`}
          name={config.fieldId}
          label={label}
        />
      );
    }
    case "FILE_UPLOAD": {
      return (
        <FileUpload
          key={`booking-form-field-FILE_UPLOAD-${config.fieldId}`}
          {...config}
          label={label}
        />
      );
    }
    default: {
      return null;
    }
  }
};

export default FormComponent;
