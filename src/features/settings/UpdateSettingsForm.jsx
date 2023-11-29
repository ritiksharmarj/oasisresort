import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useSettings } from './hooks/useSettings';
import { useUpdateSetting } from './hooks/useUpdateSetting';
import Spinner from '../../components/ui/Spinner';

function UpdateSettingsForm() {
  const [btnDisable, setBtnDisable] = useState(true);

  const { isLoading, settings = {} } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  function handleValidate() {
    // It returns true if there is at least one field passes the condition
    const isAnyFieldDifferent = Object.entries(getValues()).some(
      ([field, value]) => settings[field] !== Number(value),
    );

    setBtnDisable(!isAnyFieldDifferent);
  }

  function handleResetForm() {
    reset({
      minBookingLength: settings.minBookingLength,
      maxBookingLength: settings.maxBookingLength,
      maxGuestsPerBooking: settings.maxGuestsPerBooking,
      breakfastPrice: settings.breakfastPrice,
    });

    handleValidate();
  }

  function onSubmit(data) {
    updateSetting(data, {
      onSuccess: () => setBtnDisable(true),
    });
  }

  if (isLoading) return <Spinner className="mx-auto h-6 w-6" />;

  return (
    <div className="rounded-md border border-gray-200 bg-gray-0 p-6 shadow-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${isUpdating && 'opacity-50'}`}
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-gray-900/10 pb-12">
          <div>
            <label htmlFor="minBookingLength">Minimum nights/booking</label>
            <div className="mt-2">
              <input
                type="number"
                id="minBookingLength"
                defaultValue={settings.minBookingLength}
                {...register('minBookingLength', {
                  onChange: handleValidate,
                  min: {
                    value: 1,
                    message: 'Should be greater than 0',
                  },
                })}
              />
            </div>
            {errors.minBookingLength && (
              <p className="mt-2 text-sm text-red-700">
                {errors.minBookingLength.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="maxBookingLength">Maximum nights/booking</label>
            <div className="mt-2">
              <input
                type="number"
                id="maxBookingLength"
                defaultValue={settings.maxBookingLength}
                {...register('maxBookingLength', {
                  onChange: handleValidate,
                  min: {
                    value: 1,
                    message: 'Should be greater than 0',
                  },
                })}
              />
            </div>
            {errors.maxBookingLength && (
              <p className="mt-2 text-sm text-red-700">
                {errors.maxBookingLength.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="maxGuestsPerBooking">Maximum guests/booking</label>
            <div className="mt-2">
              <input
                type="number"
                id="maxGuestsPerBooking"
                defaultValue={settings.maxGuestsPerBooking}
                {...register('maxGuestsPerBooking', {
                  onChange: handleValidate,
                  min: {
                    value: 1,
                    message: 'Should be greater than 0',
                  },
                })}
              />
            </div>
            {errors.maxGuestsPerBooking && (
              <p className="mt-2 text-sm text-red-700">
                {errors.maxGuestsPerBooking.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="breakfastPrice">Breakfast price</label>
            <div className="mt-2">
              <input
                type="number"
                id="breakfastPrice"
                defaultValue={settings.breakfastPrice}
                {...register('breakfastPrice', {
                  onChange: handleValidate,
                  min: {
                    value: 1,
                    message: 'Should be greater than 0',
                  },
                })}
              />
            </div>
            {errors.breakfastPrice && (
              <p className="mt-2 text-sm text-red-700">
                {errors.breakfastPrice.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            disabled={btnDisable}
            onClick={handleResetForm}
            className="text-sm font-medium text-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={btnDisable}
            className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-brand-50 shadow-sm transition-all hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-brand-200"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateSettingsForm;
