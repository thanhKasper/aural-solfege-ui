interface LogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const sizeMapper = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 40,
  xl: 64,
};

const BrandLogo = ({ size = "sm" }: LogoProps) => {
  return <img src="/aural-solfege-logo.svg" width={sizeMapper[size]} />;
};

export default BrandLogo;
