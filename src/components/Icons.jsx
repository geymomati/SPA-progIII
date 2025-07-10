import React from 'react';
import { FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';

export function IconCheck(props) {
  return <FaCheck color="#22c55e" {...props} />;
}
export function IconTimes(props) {
  return <FaTimes color="#ef4444" {...props} />;
}
export function IconEdit(props) {
  return <FaEdit color="#6366f1" {...props} />;
}
export function IconTrash(props) {
  return <FaTrash color="#ef4444" {...props} />;
}

export const IconArrowLeft = ({ size = 20 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);
