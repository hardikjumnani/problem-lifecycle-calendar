import React, { useState } from 'react';

export default function Input({ name, type = 'text', value, onChange }) {
  return <input name={name} type={type} value={value} onChange={onChange} />;
}