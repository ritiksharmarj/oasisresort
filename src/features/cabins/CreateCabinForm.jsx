import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { createNewCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  // When this mutation succeeds, invalidate any queries with the "cabins" query key
  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: (data) => createNewCabin(data),
    onSuccess: () => {
      toast.success('Cabin successfully created.');

      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });

      // Reset the form
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate({ ...data, cabinImage: data.cabinImage[0] });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${isCreating && 'opacity-50'}`}
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-gray-900/10 pb-6">
        <div>
          <label
            htmlFor="cabinName"
            className="block text-sm font-medium leading-6"
          >
            Cabin name
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="cabinName"
              {...register('cabinName', {
                required: 'Name cannot be kept empty',
              })}
              className="block w-full rounded-md border-0 py-2 text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-600"
            />
          </div>
          {errors.cabinName && (
            <p className="mt-2 text-sm text-red-700">
              {errors.cabinName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="maxCapacity"
            className="block text-sm font-medium leading-6"
          >
            Maximum capacity
          </label>
          <div className="mt-2">
            <input
              type="number"
              id="maxCapacity"
              {...register('maxCapacity', {
                required: 'Capacity cannot be kept empty',
                min: {
                  value: 1,
                  message: 'Capacity should be at least one',
                },
              })}
              className="block w-full rounded-md border-0 py-2 text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-600"
            />
          </div>
          {errors.maxCapacity && (
            <p className="mt-2 text-sm text-red-700">
              {errors.maxCapacity.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="regularPrice"
            className="block text-sm font-medium leading-6"
          >
            Regular price
          </label>
          <div className="mt-2">
            <input
              type="number"
              id="regularPrice"
              {...register('regularPrice', {
                required: 'Price cannot be kept empty',
                min: {
                  value: 1,
                  message: 'Price should be at least one',
                },
              })}
              className="block w-full rounded-md border-0 py-2 text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-600"
            />
          </div>
          {errors.regularPrice && (
            <p className="mt-2 text-sm text-red-700">
              {errors.regularPrice.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="discount"
            className="block text-sm font-medium leading-6"
          >
            Discount
          </label>
          <div className="mt-2">
            <input
              type="number"
              id="discount"
              {...register('discount', {
                required: 'Discount cannot be kept empty',
                validate: (value) =>
                  +value <= +getValues().regularPrice ||
                  'Discount should be less than regular price',
              })}
              className="block w-full rounded-md border-0 py-2 text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-600"
            />
          </div>
          {errors.discount && (
            <p className="mt-2 text-sm text-red-700">
              {errors.discount.message}
            </p>
          )}
        </div>

        <div className="col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6"
          >
            Description for website
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              rows={3}
              {...register('description', {
                required: 'Description cannot be kept empty',
              })}
              className="block w-full rounded-md border-0 py-2 text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-600"
            />
          </div>
          {errors.description && (
            <p className="mt-2 text-sm text-red-700">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="col-span-2 flex items-center gap-x-12">
          <label
            htmlFor="cabinImage"
            className="block text-sm font-medium leading-6"
          >
            Cabin image
          </label>
          <div>
            <input
              type="file"
              id="cabinImage"
              accept=".jpg, .jpeg, .png"
              {...register('cabinImage', {
                required: 'Image cannot be kept empty',
              })}
              className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-brand-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-brand-50 hover:file:bg-brand-700 focus:outline-0"
            />
          </div>
          {errors.cabinImage && (
            <p className="text-sm text-red-700">{errors.cabinImage.message}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="reset"
          className="text-sm font-medium leading-6 text-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isCreating}
          className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-brand-50 shadow-sm hover:bg-brand-700"
        >
          Upload
        </button>
      </div>
    </form>
  );
}

export default CreateCabinForm;
