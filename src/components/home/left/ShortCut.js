export default function ShortCut({ link, img, name }) {
  return (
    <a href={link} target='_blank' rel='noreferer' className='shortcut_item'>
      <img src={img} alt='' />
      <span>{name}</span>
    </a>
  );
}
