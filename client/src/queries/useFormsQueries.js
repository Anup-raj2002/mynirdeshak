import { useMutation } from 'react-query';
import { submitRegistration, submitContactUs } from '../api/forms';

export function useSubmitRegistration(options) {
  return useMutation(submitRegistration, options);
}

export function useSubmitContactUs(options) {
  return useMutation(submitContactUs, options);
} 