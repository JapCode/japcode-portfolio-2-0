import capitalizeFirstLetter from '@/utils/CapitalizeFirstLetter';
import Image from 'next/image';
import { FC } from 'react';
import style from './skillComponent.module.css';

interface ISkillComponentProps {
  title: string;
  url: string;
}

const SkillComponent: FC<ISkillComponentProps> = ({
  title,
  url,
}): JSX.Element => {
  return (
    <div className={style.container}>
      <figure className={style.image}>
        <Image
          src={url}
          width={90}
          height={70}
          alt="skill icon"
          style={{ objectFit: 'contain' }}
        />
        {/* <svg width="38" height="74" viewBox="0 0 448 384" fill="none">
          <path
            d="M384 0H64C47.0318 0.0185286 30.7639 6.76732 18.7656 18.7656C6.76731 30.7639 0.0185286 47.0318 0 64V320C0.0185286 336.968 6.76731 353.236 18.7656 365.234C30.7639 377.233 47.0318 383.981 64 384H384C400.968 383.981 417.236 377.233 429.234 365.234C441.233 353.236 447.981 336.968 448 320V64C447.981 47.0318 441.233 30.7639 429.234 18.7656C417.236 6.76732 400.968 0.0185286 384 0ZM304 64C313.494 64 322.774 66.8152 330.667 72.0895C338.561 77.3638 344.713 84.8603 348.346 93.6312C351.979 102.402 352.93 112.053 351.078 121.364C349.226 130.675 344.654 139.228 337.941 145.941C331.228 152.654 322.675 157.226 313.364 159.078C304.053 160.93 294.402 159.979 285.631 156.346C276.86 152.713 269.364 146.561 264.089 138.667C258.815 130.774 256 121.494 256 112C256.013 99.2737 261.075 87.0724 270.073 78.0735C279.072 69.0746 291.274 64.0132 304 64ZM64 352C55.5131 352 47.3737 348.629 41.3726 342.627C35.3714 336.626 32 328.487 32 320V252.37L126.84 168.07C135.99 159.955 147.891 155.633 160.116 155.986C172.342 156.339 183.973 161.34 192.64 169.97L257.59 234.78L140.37 352H64ZM416 320C416 328.487 412.629 336.626 406.627 342.627C400.626 348.629 392.487 352 384 352H185.63L307.05 230.58C315.647 223.269 326.556 219.242 337.841 219.212C349.126 219.183 360.056 223.154 368.69 230.42L416 269.84V320Z"
            fill="#707070"
          />
        </svg> */}
      </figure>
      <div className={style.nameContainer}>
        <span>{capitalizeFirstLetter(title)}</span>
      </div>
    </div>
  );
};

export default SkillComponent;
