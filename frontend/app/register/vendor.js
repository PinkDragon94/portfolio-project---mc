'use client';
export default function VendorRegister() {
  return (
    <form>
      <h2>Vendor Registration</h2>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
}
