import svgPaths from "./svg-gk5bjx4q3q";
import { imgGroup, imgGroup1 } from "./svg-bzhtq";

function Group3() {
  return (
    <div className="absolute inset-[1.91%_54.86%_59.3%_16.98%] mask-position-[-0.411px_-0.573px,_0px_-0.004px] mask-size-[18.01px_12.28px,_17.511px_11.626px]" style={{ maskImage: `url("${imgGroup}"), url("${imgGroup1}")` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" height="11.6228" preserveAspectRatio="none" viewBox="0 0 17.5185 11.6228" width="17.5185">
        <g id="Group">
          <path d={svgPaths.p21f8c600} fill="white" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute contents inset-[1.9%_54.88%_59.3%_16.98%]" data-name="Clip path group">
      <Group3 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[1.9%_54.88%_59.3%_16.98%]" data-name="Group">
      <ClipPathGroup1 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[1.9%_54.88%_59.3%_16.98%]" data-name="Group">
      <Group2 />
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[0_54.74%_59.02%_16.32%]" data-name="Clip path group">
      <Group1 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[0_54.74%_59.02%_16.32%]" data-name="Group">
      <ClipPathGroup />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute h-[15.635px] left-0 top-[14.33px] w-[62.214px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="15.635" preserveAspectRatio="none" viewBox="0 0 62.2135 15.635" width="62.2135">
        <g id="Frame 10540">
          <path d={svgPaths.pf649e00} fill="white" id="Vector" />
          <path d={svgPaths.p7a2d000} fill="white" id="Vector_2" />
          <path d={svgPaths.p2608b000} fill="white" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-[29.963px] relative shrink-0 w-[62.214px]">
      <Group />
      <Frame />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute h-[21.759px] left-[67.21px] top-[13.1px] w-[62.378px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="21.7586" preserveAspectRatio="none" viewBox="0 0 62.3782 21.7586" width="62.3782">
        <g id="Frame 10541">
          <path d={svgPaths.p3b43ec00} fill="white" id="Vector" />
          <path d={svgPaths.p1141c700} fill="white" id="Vector_2" />
          <path d={svgPaths.p397d1f00} fill="white" id="Vector_3" />
          <path d={svgPaths.p2b0eeb00} fill="white" id="Vector_4" />
          <path d={svgPaths.pd68ea00} fill="white" id="Vector_5" />
          <path d={svgPaths.p26f04e00} fill="white" id="Vector_6" />
        </g>
      </svg>
    </div>
  );
}

export default function Surface() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative size-full" data-name="surface1">
      <Frame2 />
      <Frame1 />
    </div>
  );
}