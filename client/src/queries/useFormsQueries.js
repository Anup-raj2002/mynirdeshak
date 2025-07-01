import { useMutation } from '@tanstack/react-query';
import { submitRegistration, submitContactUs } from '../api/forms';

export function useSubmitRegistration() {
  return useMutation({
    mutationFn: submitRegistration,
  });
}

export function useSubmitContactUs() {
  return useMutation({
    mutationFn: submitContactUs,
  });
} 