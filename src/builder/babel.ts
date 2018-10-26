declare type BabelConfig = {
  babelrc: Boolean;
  plugins: Array<string | Array<any>>;
};

export default function() {
  const babelConfig: BabelConfig = {
    babelrc: false,
    plugins: ['@babel/plugin-transform-async-to-generator'],
  };

  return babelConfig;
}
