import { useEffect } from "react";
import { PAGES } from "pages/constans";
import { generatePath, useNavigate } from "react-router";
import { useMutation } from "@apollo/client";
import { ConfirmBookingMutationResult, ConfirmBookingMutationVariables } from "../api/mutations/models";
import { CONFIRM_BOOKING } from "../api/mutations/mutations";

export const useConfirmBooking = (bookingId: string) => {
  const navigate = useNavigate();

  const [confirmBooking, { data, loading, error }] = useMutation<
    ConfirmBookingMutationResult,
    ConfirmBookingMutationVariables
  >(CONFIRM_BOOKING, {
    context: {
      headers: {
        "x-api-client-name": "booking-page",
      },
    },
    variables: {
      bookingId,
    },
  });

  useEffect(() => {
    confirmBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!error) {
      navigate("/");
    }
  }, [error, navigate]);

  useEffect(() => {
    if (!data && loading === false) {
      navigate(generatePath(PAGES.BOOKING, { id: bookingId }));
    }
  }, [bookingId, data, navigate, loading]);
};
