import React from 'react'

const UserCart = () => {
  return (
    <>
    <div className="container my-5">
  <h2 className="mb-4">Your Book Cart</h2>

  <div className="card mb-3" *ngFor="let book of cartItems">
    <div className="row g-0 align-items-center">
      <div className="col-md-2">
        <img src="book-cover.jpg" className="img-fluid rounded-start" alt="Book Cover" />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">Book Title</h5>
          <p className="card-text"><small className="text-muted">by Author Name</small></p>
          <p className="card-text">Category: Fiction</p>
          <p className="card-text">Borrowing Period: 14 days</p>
        </div>
      </div>
      <div className="col-md-2 text-center">
        <button className="btn btn-outline-danger mb-2 w-100">Remove</button>
        <button className="btn btn-primary w-100">Borrow</button>
      </div>
    </div>
  </div>

  <div className="text-end mt-4">
    <button className="btn btn-success px-4 py-2">Proceed to Checkout</button>
  </div>
</div>
</>
  )
}

export default UserCart