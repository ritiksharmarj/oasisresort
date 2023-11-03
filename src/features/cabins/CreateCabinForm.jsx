import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { createNewCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

function CreateCabinForm() {
  const { register, handleSubmit, reset } = useForm();

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
    mutate(data);
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
              {...register('cabinName')}
              name="cabinName"
              id="cabinName"
              className="block w-full rounded-md border-0 py-2 text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-600"
            />
          </div>
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
              {...register('maxCapacity')}
              name="maxCapacity"
              id="maxCapacity"
              className="block w-full rounded-md border-0 py-2 text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-600"
            />
          </div>
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
              {...register('regularPrice')}
              name="regularPrice"
              id="regularPrice"
              className="block w-full rounded-md border-0 py-2 text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-600"
            />
          </div>
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
              {...register('discount')}
              name="discount"
              id="discount"
              className="block w-full rounded-md border-0 py-2 text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-600"
            />
          </div>
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
              {...register('description')}
              name="description"
              id="description"
              rows={3}
              className="block w-full rounded-md border-0 py-2 text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-600"
            />
          </div>
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
              name="cabinImage"
              id="cabinImage"
              className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-brand-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-brand-50 hover:file:bg-brand-700 focus:outline-0"
            />
          </div>
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
          Save
        </button>
      </div>
    </form>
  );
}

export default CreateCabinForm;
