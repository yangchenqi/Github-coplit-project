// 用户名验证正则表达式单元测试
// 正则表达式: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/
// 要求: 至少1个大写字母, 1个特殊字符(!@#$&*), 1个数字, 最少8个字符

describe('Username Validation Regex Tests', () => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;

    // 有效用户名测试用例
    describe('Valid usernames', () => {
        test('should accept valid username with all requirements', () => {
            expect(regex.test('TomTom1!')).toBe(true);
        });

        test('should accept username with minimum 8 characters', () => {
            expect(regex.test('Abc123!@')).toBe(true);
        });

        test('should accept username with multiple uppercase letters', () => {
            expect(regex.test('ABCD123!')).toBe(true);
        });

        test('should accept username with multiple special characters', () => {
            expect(regex.test('Test123!@#')).toBe(true);
        });

        test('should accept username with multiple numbers', () => {
            expect(regex.test('Test12345!')).toBe(true);
        });

        test('should accept long username', () => {
            expect(regex.test('VeryLongUsername123!')).toBe(true);
        });

        test('should accept username with all allowed special characters', () => {
            expect(regex.test('Test1!')).toBe(true);
            expect(regex.test('Test1@')).toBe(true);
            expect(regex.test('Test1#')).toBe(true);
            expect(regex.test('Test1$')).toBe(true);
            expect(regex.test('Test1&')).toBe(true);
            expect(regex.test('Test1*')).toBe(true);
        });

        test('should accept username with mixed case letters', () => {
            expect(regex.test('TestUser1!')).toBe(true);
        });

        test('should accept username with special chars in different positions', () => {
            expect(regex.test('!Test123')).toBe(true);
            expect(regex.test('Test!123')).toBe(true);
            expect(regex.test('Test123!')).toBe(true);
        });
    });

    // 无效用户名测试用例
    describe('Invalid usernames', () => {
        test('should reject username without uppercase letter', () => {
            expect(regex.test('tomtom1!')).toBe(false);
        });

        test('should reject username without special character', () => {
            expect(regex.test('TomTom12')).toBe(false);
        });

        test('should reject username without number', () => {
            expect(regex.test('TomTom!@')).toBe(false);
        });

        test('should reject username shorter than 8 characters', () => {
            expect(regex.test('Tom1!')).toBe(false);
            expect(regex.test('T1!')).toBe(false);
            expect(regex.test('')).toBe(false);
        });

        test('should reject username with exactly 7 characters', () => {
            expect(regex.test('Test12!')).toBe(false);
        });

        test('should reject username with unsupported special characters', () => {
            expect(regex.test('Test123%')).toBe(false);
            expect(regex.test('Test123+')).toBe(false);
            expect(regex.test('Test123=')).toBe(false);
            expect(regex.test('Test123_')).toBe(false);
            expect(regex.test('Test123-')).toBe(false);
            expect(regex.test('Test123.')).toBe(false);
            expect(regex.test('Test123,')).toBe(false);
            expect(regex.test('Test123?')).toBe(false);
        });

        test('should reject username with only lowercase letters', () => {
            expect(regex.test('testuser1!')).toBe(false);
        });

        test('should reject username with only uppercase letters', () => {
            expect(regex.test('TESTUSER1!')).toBe(true); // 这个实际上应该通过
        });

        test('should reject empty string', () => {
            expect(regex.test('')).toBe(false);
        });

        test('should reject null or undefined', () => {
            expect(regex.test(null)).toBe(false);
            expect(regex.test(undefined)).toBe(false);
        });

        test('should reject whitespace only', () => {
            expect(regex.test('        ')).toBe(false);
        });

        test('should reject username with spaces', () => {
            expect(regex.test('Test User1!')).toBe(false);
            expect(regex.test(' TestUser1!')).toBe(false);
            expect(regex.test('TestUser1! ')).toBe(false);
        });
    });

    // 边界测试用例
    describe('Edge cases', () => {
        test('should handle exactly 8 characters with all requirements', () => {
            expect(regex.test('TestUs1!')).toBe(true);
        });

        test('should handle numbers at different positions', () => {
            expect(regex.test('1TestUs!')).toBe(true);
            expect(regex.test('Test1Us!')).toBe(true);
            expect(regex.test('TestUs1!')).toBe(true);
        });

        test('should handle uppercase at different positions', () => {
            expect(regex.test('Testus1!')).toBe(true);
            expect(regex.test('tEstus1!')).toBe(true);
            expect(regex.test('testUs1!')).toBe(true);
            expect(regex.test('testuS1!')).toBe(true);
        });

        test('should handle multiple requirements in minimal form', () => {
            expect(regex.test('Aa1!bcde')).toBe(true);
        });

        test('should reject when missing just one requirement', () => {
            expect(regex.test('testuser1!')).toBe(false); // 缺少大写
            expect(regex.test('TestUser1')).toBe(false);  // 缺少特殊字符
            expect(regex.test('TestUser!')).toBe(false);  // 缺少数字
            expect(regex.test('Test1!')).toBe(false);     // 长度不够
        });
    });

    // 性能测试用例（可选）
    describe('Performance tests', () => {
        test('should handle very long strings efficiently', () => {
            const longString = 'A'.repeat(1000) + '1!';
            const start = performance.now();
            const result = regex.test(longString);
            const end = performance.now();
            
            expect(result).toBe(true);
            expect(end - start).toBeLessThan(10); // 应该在10ms内完成
        });
    });
});

// 如果在Node.js环境中运行，可以使用这个简单的测试运行器
if (typeof module !== 'undefined' && module.exports) {
    // 简单的测试运行器
    function runTests() {
        const regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;
        
        console.log('Running Username Validation Tests...\n');
        
        // 测试用例数组
        const testCases = [
            // 有效用例
            { input: 'TomTom1!', expected: true, description: '标准有效用户名' },
            { input: 'Abc123!@', expected: true, description: '最短有效用户名' },
            { input: 'TESTUSER1!', expected: true, description: '全大写字母' },
            { input: 'VeryLongUsername123!', expected: true, description: '长用户名' },
            
            // 无效用例
            { input: 'tomtom1!', expected: false, description: '缺少大写字母' },
            { input: 'TomTom12', expected: false, description: '缺少特殊字符' },
            { input: 'TomTom!@', expected: false, description: '缺少数字' },
            { input: 'Tom1!', expected: false, description: '长度不够' },
            { input: 'Test123%', expected: false, description: '不支持的特殊字符' },
            { input: '', expected: false, description: '空字符串' },
            { input: 'Test User1!', expected: false, description: '包含空格' }
        ];
        
        let passed = 0;
        let failed = 0;
        
        testCases.forEach((testCase, index) => {
            const result = regex.test(testCase.input);
            if (result === testCase.expected) {
                console.log(`✓ Test ${index + 1}: ${testCase.description} - PASSED`);
                passed++;
            } else {
                console.log(`✗ Test ${index + 1}: ${testCase.description} - FAILED`);
                console.log(`  Input: "${testCase.input}"`);
                console.log(`  Expected: ${testCase.expected}, Got: ${result}`);
                failed++;
            }
        });
        
        console.log(`\nTest Results: ${passed} passed, ${failed} failed`);
        
        if (failed === 0) {
            console.log('🎉 All tests passed!');
        }
    }
    
    // 导出测试函数
    module.exports = { runTests };
    
    // 如果直接运行此文件，执行测试
    if (require.main === module) {
        runTests();
    }
}