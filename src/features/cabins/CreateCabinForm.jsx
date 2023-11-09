import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

function CreateCabinForm({ editCabinProps = {} }) {
  const { id: editCabinId, ...editCabinValues } = editCabinProps;

  // If we click on edit cabin then this will become true
  const isEditCabinSession = Boolean(editCabinId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditCabinSession ? editCabinValues : {},
  });

  const queryClient = useQueryClient();

  /**
   * Create a cabin
   * When this mutation succeeds, invalidate any queries with the "cabins" query key
   */
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: (data) => createEditCabin(data),
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

  /**
   * Edit a cabin
   * When this mutation succeeds, invalidate any queries with the "cabins" query key
   */
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ data, id }) => createEditCabin(data, id),
    onSuccess: () => {
      toast.success('Cabin successfully edited.');

      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });

      // Reset the form
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image =
      typeof data.cabinImage === 'string'
        ? data.cabinImage
        : data.cabinImage[0];

    if (isEditCabinSession)
      editCabin({ data: { ...data, cabinImage: image }, id: editCabinId });
    else createCabin({ ...data, cabinImage: image });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${isWorking && 'opacity-50'}`}
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-gray-900/10 pb-6">
        <div>
          <label htmlFor="cabinName">Cabin name</label>
          <div className="mt-2">
            <input
              type="text"
              id="cabinName"
              {...register('cabinName', {
                required: 'Name cannot be kept empty',
              })}
            />
          </div>
          {errors.cabinName && (
            <p className="mt-2 text-sm text-red-700">
              {errors.cabinName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="maxCapacity">Maximum capacity</label>
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
            />
          </div>
          {errors.maxCapacity && (
            <p className="mt-2 text-sm text-red-700">
              {errors.maxCapacity.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="regularPrice">Regular price</label>
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
            />
          </div>
          {errors.regularPrice && (
            <p className="mt-2 text-sm text-red-700">
              {errors.regularPrice.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="discount">Discount</label>
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
            />
          </div>
          {errors.discount && (
            <p className="mt-2 text-sm text-red-700">
              {errors.discount.message}
            </p>
          )}
        </div>

        <div className="col-span-2">
          <label htmlFor="description">Description for website</label>
          <div className="mt-2">
            <textarea
              id="description"
              rows={3}
              {...register('description', {
                required: 'Description cannot be kept empty',
              })}
            />
          </div>
          {errors.description && (
            <p className="mt-2 text-sm text-red-700">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="col-span-2 flex items-center gap-x-12">
          <label htmlFor="cabinImage">Cabin image</label>
          <div>
            <input
              type="file"
              id="cabinImage"
              accept=".jpg, .jpeg, .png"
              {...register('cabinImage', {
                validate: (fileData) => {
                  if (typeof fileData === 'string' || fileData.length > 0)
                    return true;
                  return 'Image cannot be kept empty';
                },
              })}
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
          disabled={isWorking}
          className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-brand-50 shadow-sm hover:bg-brand-700"
        >
          {isEditCabinSession ? 'Save cabin' : 'Upload cabin'}
        </button>
      </div>
    </form>
  );
}

export default CreateCabinForm;
