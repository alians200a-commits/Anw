import { GameController } from '@phosphor-icons/react';
import {
  DALEELI_ANIMATED_ASSETS,
  RemoteAnimatedAssetIcon
} from './ui/RemoteAnimatedAssetIcon';

export function GamesHub() {
  return (
    <div className="space-y-4">
      <section className="rounded-[20px] border border-[#DCE5EA] bg-[#F8FAFB] px-4 py-4">
        <div className="flex items-center justify-end gap-3 text-right">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-black text-[#183149]">
              تعلّم واختبر نفسك
            </h2>
            <p className="mt-1 text-[11px] font-semibold leading-5 text-[#5F7280]">
              قسم الأنشطة التعليمية والاختبارات قيد التجهيز.
            </p>
          </div>

          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[15px] border border-[#D7E2E9] bg-[#EEF3F6] text-[#315672]">
            <RemoteAnimatedAssetIcon
              src={DALEELI_ANIMATED_ASSETS.learn}
              play
              durationMs={900}
              className="h-8 w-8"
              fallback={<GameController size={25} weight="bold" />}
            />
          </div>
        </div>
      </section>

      <div className="rounded-[18px] border border-dashed border-[#C9D6DF] bg-white px-4 py-6 text-center">
        <p className="text-[11px] font-black text-[#405E75]">قريباً</p>
        <p className="mt-1.5 text-[11px] font-semibold leading-5 text-[#5F7280]">
          ستظهر هنا الأنشطة والاختبارات بعد اكتمال تجهيزها.
        </p>
      </div>
    </div>
  );
}