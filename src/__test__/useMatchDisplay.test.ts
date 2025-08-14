import React = require("react");
import { useMatchDisplay } from "../hook/useMatchDisplay";

// 自定義 hook 測試輔助函數
function renderHook<T>(hook: () => T): { result: { current: T }, unmount: () => void, waitForNextUpdate: () => Promise<void> } {
    const result = { current: null as unknown as T };
    let updateResolver: (() => void) | null = null;
    let updated = false;
    let Component = ({ children }: { children?: React.ReactNode }) => {
        const value = hook();
        // 檢查是否有 state 更新
        if (!updated && result.current !== value && updateResolver) {
            updated = true;
            setTimeout(() => {
                updateResolver && updateResolver();
            }, 0);
        }
        result.current = value;
        return null;
    };

    const { unmount } = render(React.createElement(Component));
    const waitForNextUpdate = () => {
        return new Promise<void>((resolve) => {
            updated = false;
            updateResolver = resolve;
        });
    };
    return { result, unmount, waitForNextUpdate };
}

// 自定義 render 函數
function render(element: React.ReactElement) {
    let unmount = () => { };
    React.act(() => {
        const testRenderer = require('react-test-renderer').create(element);
        unmount = () => testRenderer.unmount();
    });
    return { unmount };
}

describe('useMatchDisplay', () => {
    it('should return initial state', () => {
        const { result } = renderHook(() => useMatchDisplay());
        expect(result.current.homeScore).toBe('');
        expect(result.current.awayScore).toBe('');
        expect(result.current.period).toBe('');
    });

    it('should update scores and period', async () => {
        const { result } = renderHook(() => useMatchDisplay());
        await React.act(() => result.current.getMatchResult(1));
        expect(result.current.homeScore).toBe('1');
        expect(result.current.awayScore).toBe('0');
        expect(result.current.period).toBe('1st');
    });
});
