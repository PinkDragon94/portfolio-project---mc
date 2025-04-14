'use client';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const handleRedirect = (e) => {
    const role = e.target.value;
    if (role) {
      router.push(`/register/${role.toLowerCase()}`);
    }
  };

  return (
    <div>
      <h2>Select Role to Register</h2>
      <select onChange={handleRedirect}>
        <option value="">Select Role</option>
        <option value="Admin">Admin</option>
        <option value="Alumni">Alumni</option>
        <option value="Vendor">Vendor</option>
      </select>
    </div>
  );
}

