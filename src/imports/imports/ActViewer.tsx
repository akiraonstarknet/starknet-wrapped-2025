export default function ActViewer() {
  return (
    <div className="content-stretch flex items-start relative size-full" data-name="ActViewer">
      <p className="font-['Inter:Black',sans-serif] font-black leading-[36px] not-italic relative shrink-0 text-[0px] text-black text-nowrap tracking-[0.3955px]">
        <span className="text-[30px]">$34 Gas spent</span>
        <span className="font-['Inter:Medium',sans-serif] font-medium text-[24px]">{` (avg $0.01 per tx)`}</span>
      </p>
    </div>
  );
}