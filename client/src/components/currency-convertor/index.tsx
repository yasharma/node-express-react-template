import React, { useState, FormEvent } from "react";
import CurrencyService from '../../services/CurrencyService';

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>('');
  const [isSubmitting, setSubmitting] = useState(false);
  
  const handleChange = (event: FormEvent<HTMLInputElement>) => setAmount(event.currentTarget.value);
  
  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const result = await CurrencyService.getConversionAmount(amount);
      setSubmitting(false);
      alert(result);
    } catch (error) {
      setSubmitting(false);
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Amount:
      <input type="number" name="amount" value={amount} onChange={handleChange} />
      </label>
      <input disabled={isSubmitting} type="submit" value="Submit" />
    </form>
  );
}