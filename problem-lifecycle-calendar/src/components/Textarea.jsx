import React, { useState } from 'react';

export default function Textarea({ name, value, onChange }) {
  return <textarea name={name} value={value} onChange={onChange} />;
}