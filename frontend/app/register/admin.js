'use client';
export default function AdminRegister() {
  return (
    <form>
      <h2>Admin Registration</h2>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
}
