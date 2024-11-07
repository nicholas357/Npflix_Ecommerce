import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { ImageLoader } from '@/components/common';
import {
  CustomColorInput, CustomCreatableSelect, CustomInput, CustomTextarea
} from '@/components/formik';
import {
  Field, FieldArray, Form, Formik
} from 'formik';
import { useFileHandler } from '@/hooks';
import PropTypes from 'prop-types';
import React from 'react';
import * as Yup from 'yup';

const brandOptions = [
  { value: 'netflix', label: 'Netflix' },
  { value: 'spotify', label: 'Spotify' },
  { value: 'giftcards', label: 'GiftCards' },
  { value: 'topups', label: 'TopUps' },
  { value: 'softwares', label: 'Softwares' },
  { value: 'subscriptions', label: 'Subscriptions' },
  { value: 'Others', label: 'Others' },
];

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .required('Product name is required.')
    .max(60, 'Product name must only be less than 60 characters.'),
  brand: Yup.string()
    .required('Brand name is required.'),
  description: Yup.string()
    .required('Description is required.'),
  maxQuantity: Yup.number()
    .positive('Max quantity is invalid.')
    .integer('Max quantity should be an integer.')
    .required('Max quantity is required.'),
  keywords: Yup.array()
    .of(Yup.string())
    .min(1, 'Please enter at least 1 keyword for this product.'),
  isFeatured: Yup.boolean(),
  isRecommended: Yup.boolean(),
  availableColors: Yup.array()
    .of(Yup.string().required())
    .min(1, 'Please add a default color for this product.'),
  sizePrices: Yup.array()
    .of(
      Yup.object().shape({
        size: Yup.string().required('Size is required.'),
        price: Yup.number()
          .positive('Price is invalid.')
          .integer('Price should be an integer.')
          .required('Price is required.'),
        weights: Yup.array().of(
          Yup.object().shape({
            weight: Yup.string().required('Weight is required.'),
            price: Yup.number()
              .positive('Price is invalid.')
              .integer('Price should be an integer.')
              .required('Price is required.')
          })
        ).min(1, 'At least one weight is required.')
      })
    )
    .min(1, 'Please enter a size, price, and at least one weight for this product.'), // Adjusted validation message
  image: Yup.string(), // Adjust validation as needed
  imageCollection: Yup.array(), // Adjust validation as needed
});

const ProductForm = ({ product, onSubmit, isLoading }) => {
  const initFormikValues = {
    name: product?.name || '',
    brand: product?.brand || '',
    description: product?.description || '',
    maxQuantity: product?.maxQuantity || 0,
    RoundPrice: product?.RoundPrice,
    keywords: product?.keywords || [],
    isFeatured: product?.isFeatured || false,
    isRecommended: product?.isRecommended || false,
    availableColors: product?.availableColors || [],
    sizePrices: product?.sizePrices || [{ size: '', price: 0, weights: [{ weight: '', price: 0 }] }],
    descriptions: product?.descriptions || '', // Initial sizePrices with weights
  };

  const {
    imageFile,
    isFileLoading,
    onFileChange,
    removeImage
  } = useFileHandler({ image: {}, imageCollection: product?.imageCollection || [] });

  const onSubmitForm = (form) => {
    if (imageFile.image.file || product.imageUrl) {
      onSubmit({
        ...form,
        quantity: 1,
        name_lower: form.name.toLowerCase(),
        dateAdded: new Date().getTime(),
        image: imageFile?.image?.file || product.imageUrl,
        imageCollection: imageFile.imageCollection
      });
    } else {
      alert('Product thumbnail image is required.');
    }
  };

  return (
    <div>
      <Formik
        initialValues={initFormikValues}
        validateOnChange
        validationSchema={FormSchema}
        onSubmit={onSubmitForm}
      >
        {({ values, setValues }) => (
          <Form className="product-form">
            <div className="product-form-inputs">
              <div className="d-flex">
                <div className="product-form-field">
                  <Field
                    disabled={isLoading}
                    name="name"
                    type="text"
                    label="* Product Name"
                    placeholder="Product Name"
                    style={{ textTransform: 'capitalize' }}
                    component={CustomInput}
                  />
                </div>
                &nbsp;
                <div className="product-form-field">
                  <CustomCreatableSelect
                    defaultValue={{ label: values.brand, value: values.brand }}
                    name="brand"
                    id="brand"
                    options={brandOptions}
                    disabled={isLoading}
                    placeholder="Select/Create Brand"
                    label="* Brand"
                  />
                </div>
              </div>
              <div className="product-form-field">
                <Field
                  disabled={isLoading}
                  name="description"
                  id="description"
                  rows={3}
                  label="* Product Description"
                  component={CustomTextarea}
                />
              </div>
              <div className="product-form-field">
                <Field
                  disabled={isLoading}
                  name="descriptions"
                  id="descriptions"
                  rows={3}
                  label="* Additional Description"
                  component={CustomTextarea}
                />
              </div>
              <div className="product-form-field">
                <Field
                  disabled={isLoading}
                  name="maxQuantity"
                  type="number"
                  id="maxQuantity"
                  label="* Max Quantity"
                  component={CustomInput}
                />
                </div>
                <div className="product-form-field">
                <Field
                  disabled={isLoading}
                  name="RoundPrice"
                  type="text"
                  id="RoundPrice"
                  label="* Round Price"
                  component={CustomInput}
                />
                
              </div>
              <div className="d-flex">
                <div className="product-form-field">
                  <CustomCreatableSelect
                    defaultValue={values.keywords.map((key) => ({ value: key, label: key }))}
                    name="keywords"
                    id="keywords"
                    isMulti
                    disabled={isLoading}
                    placeholder="Create/Select Keywords"
                    label="* Keywords"
                  />
                </div>
              </div>
              <div className="product-form-field">
                <FieldArray
                  name="availableColors"
                  disabled={isLoading}
                  component={CustomColorInput}
                />
              </div>
              <div className="product-form-field">
                <span className="d-block padding-s">* Sizes with Prices and Weights</span>
                <FieldArray
                  name="sizePrices"
                  render={(arrayHelpers) => (
                    <div>
                      {values.sizePrices.map((sizePrice, index) => (
                        <div key={index}>
                          <div className="d-flex align-items-center">
                            <div className="product-form-field">
                              <Field
                                name={`sizePrices[${index}].size`}
                                placeholder="Size"
                                component={CustomInput}
                                disabled={isLoading}
                              />
                            </div>
                            &nbsp;
                            <div className="product-form-field">
                              <Field
                                name={`sizePrices[${index}].price`}
                                placeholder="Price"
                                type="number"
                                component={CustomInput}
                                disabled={isLoading}
                              />
                            </div>
                            &nbsp;
                            <button
                              type="button"
                              className="button"
                              onClick={() => arrayHelpers.remove(index)}
                              disabled={isLoading}
                            >
                              Remove Size
                            </button>
                          </div>
                          <div className="product-form-field">
                            <span className="d-block padding-s">Weights</span>
                            <FieldArray
                              name={`sizePrices[${index}].weights`}
                              render={(weightArrayHelpers) => (
                                <div>
                                  {sizePrice.weights.map((weight, weightIndex) => (
                                    <div key={weightIndex} className="d-flex align-items-center">
                                      <div className="product-form-field">
                                        <Field
                                          name={`sizePrices[${index}].weights[${weightIndex}].weight`}
                                          placeholder="Weight"
                                          type="text"
                                          component={CustomInput}
                                          disabled={isLoading}
                                        />
                                      </div>
                                      &nbsp;
                                      <div className="product-form-field">
                                        <Field
                                          name={`sizePrices[${index}].weights[${weightIndex}].price`}
                                          placeholder="Price"
                                          type="number"
                                          component={CustomInput}
                                          disabled={isLoading}
                                        />
                                      </div>
                                      &nbsp;
                                      <button
                                        type="button"
                                        className="button"
                                        onClick={() => weightArrayHelpers.remove(weightIndex)}
                                        disabled={isLoading}
                                      >
                                        Remove Duration
                                      </button>
                                    </div>
                                  ))}
                                  <br />
                                  <button
                                    type="button"
                                    className="button"
                                    onClick={() => weightArrayHelpers.push({ weight: '', price: 0 })}
                                    disabled={isLoading}
                                  >
                                    Add Duration
                                  </button>
                                </div>
                              )}
                            />
                          </div>
                        </div>
                      ))}
                      <br />
                      <button
                        type="button"
                        className="button"
                        onClick={() => arrayHelpers.push({ size: '', price: 0, weights: [{ weight: '', price: 0 }] })}
                        disabled={isLoading}
                      >
                        Add Size with Price and Duration
                      </button>
                    </div>
                  )}
                />
              </div>
              <div className="product-form-field">
                <span className="d-block padding-s">Image Collection</span>
                {!isFileLoading && (
                  <label htmlFor="product-input-file-collection">
                    <input
                      disabled={isLoading}
                      hidden
                      id="product-input-file-collection"
                      multiple
                      onChange={(e) => onFileChange(e, { name: 'imageCollection', type: 'multiple' })}
                      readOnly={isLoading}
                      type="file"
                    />
                    Choose Images
                  </label>
                )}
              </div>
              <div className="product-form-collection">
                <>
                  {imageFile.imageCollection.length >= 1 && (
                    imageFile.imageCollection.map((image) => (
                      <div
                        className="product-form-collection-image"
                        key={image.id}
                      >
                        <ImageLoader
                          alt=""
                          src={image.url}
                        />
                        <button
                          className="product-form-delete-image"
                          onClick={() => removeImage({ id: image.id, name: 'imageCollection' })}
                          title="Delete Image"
                          type="button"
                        >
                          <i className="fa fa-times-circle" />
                        </button>
                      </div>
                    ))
                  )}
                </>
              </div>
              <br />
              <div className="d-flex">
                <div className="product-form-field">
                  <input
                    checked={values.isFeatured}
                    className=""
                    id="featured"
                    onChange={(e) => setValues({ ...values, isFeatured: e.target.checked })}
                    type="checkbox"
                  />
                  <label htmlFor="featured">
                    <h5 className="d-flex-grow-1 margin-0">
                      &nbsp; Add to Featured &nbsp;
                    </h5>
                  </label>
                </div>
                <div className="product-form-field">
                  <input
                    checked={values.isRecommended}
                    className=""
                    id="recommended"
                    onChange={(e) => setValues({ ...values, isRecommended: e.target.checked })}
                    type="checkbox"
                  />
                  <label htmlFor="recommended">
                    <h5 className="d-flex-grow-1 margin-0">
                      &nbsp; Add to Recommended &nbsp;
                    </h5>
                  </label>
                </div>
              </div>
              <br />
              <div className="product-form-field product-form-submit">
                <button
                  className="button"
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? <LoadingOutlined /> : <CheckOutlined />}
                  &nbsp;
                  {isLoading ? 'Saving Product' : 'Save Product'}
                </button>
              </div>
            </div>
            <div className="product-form-file">
              <div className="product-form-field">
                <span className="d-block padding-s">* Thumbnail</span>
                {!isFileLoading && (
                  <label htmlFor="product-input-file">
                    <input
                      disabled={isLoading}
                      hidden
                      id="product-input-file"
                      onChange={(e) => onFileChange(e, { name: 'image', type: 'single' })}
                      readOnly={isLoading}
                      type="file"
                    />
                    Choose Image
                  </label>
                )}
              </div>
              <div className="product-form-image-wrapper">
                {(imageFile.image.url || product.image) && (
                  <ImageLoader
                    alt=""
                    className="product-form-image-preview"
                    src={imageFile.image.url || product.image}
                  />
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

ProductForm.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    brand: PropTypes.string,
    description: PropTypes.string,
    descriptions: PropTypes.string,
    maxQuantity: PropTypes.number,
    RoundPrice: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    isFeatured: PropTypes.bool,
    isRecommended: PropTypes.bool,
    availableColors: PropTypes.arrayOf(PropTypes.string),
    sizePrices: PropTypes.arrayOf(
      PropTypes.shape({
        size: PropTypes.string,
        price: PropTypes.number,
        weights: PropTypes.arrayOf(
          PropTypes.shape({
            weight: PropTypes.string,
            price: PropTypes.number
          })
        )
      })
    ),
    imageCollection: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default ProductForm;
