import {
  CheckCircle,
  CurrencyCircleDollar,
  Warehouse,
} from '@phosphor-icons/react';

function BookingDataBox() {
  return (
    <div className="flex min-w-full flex-col overflow-hidden rounded-md bg-gray-0 shadow-sm">
      <div className="flex items-center justify-between bg-brand-500 px-10 py-5 text-xl font-medium text-brand-50">
        <div className="flex items-center gap-2">
          <Warehouse size={32} />
          <span>10 nights in Cabin 007</span>
        </div>

        <span>Mon, Jul 10 2023 (5 months ago) — Thu, Jul 20 2023</span>
      </div>

      <div className="flex flex-col rounded-md rounded-t-none border border-t-0 border-gray-300">
        <div className="flex flex-col px-10 pb-3 pt-8">
          <div className="mb-6 flex items-center gap-4 text-gray-500">
            <span className="font-medium text-gray-700">
              Nina Williams + 6 guests
            </span>
            <span>&bull;</span>
            <span>nina@hotmail.com</span>
            <span>&bull;</span>
            <span>National ID 2345678901</span>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <span className="flex items-center gap-2 text-base font-medium">
              <CheckCircle size={24} className="text-brand-600" />
              Breakfast included?
            </span>
            <span>Yes</span>
          </div>

          <div className="flex items-center justify-between rounded-md bg-green-100 px-8 py-6 text-green-700">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 font-medium">
                <CurrencyCircleDollar size={24} />
                Total price
              </span>
              <span>$6,050.00 ($5,000.00 cabin + $1,050.00 breakfast)</span>
            </div>

            <span className="font-semibold uppercase">PAID</span>
          </div>
        </div>

        <div className="px-10 py-4 text-right text-sm text-gray-500">
          <span>Booked Wed, May 24 2023, 4:16 PM</span>
        </div>
      </div>
    </div>
  );
}

export default BookingDataBox;
