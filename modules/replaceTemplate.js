module.exports = (temp, product) => {
  const placeholders = {
    "{%PRODUCTNAME%}": product.productName,
    "{%ID%}": product.id,
    "{%IMAGE%}": product.image,
    "{%FROM%}": product.from,
    "{%QUANTITY%}": product.quantity,
    "{%PRODUCTNUTRIENTS%}": product.nutrients,
    "{%PRICE%}": product.price,
    "{%DESCRIPTION%}": product.description,
  };

  if (!product.organic) {
    placeholders["{%NOT_ORGANIC%}"] = "not-organic";
  }

  let output = temp;
  for (const [placeholder, value] of Object.entries(placeholders)) {
    output = output.replace(new RegExp(placeholder, "g"), value);
  }

  return output;
};
